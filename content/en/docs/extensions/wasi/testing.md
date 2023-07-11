---
title: "Testing"
description: "Test your WASI extension."
# lead: "`extgen` provides a test suite for your WASI extension."
draft: false
images: []
menu:
  docs:
    parent: "grpc"
weight: 200
toc: true
---

`extgen` provides a test suite for your WASI extension.

## Install `extgen`

```bash
go install github.com/suffiks/suffiks/cmd/extgen@latest
```

## Run the test suite

```bash
extgen wasi test --ext ./k8s-resources.yaml build/release.wasm
```

Where the `--ext` flag points to a YAML file containing the extension CRD and optionally
other Kubernetes resources that are required for the test.

If your extension has a `config` section, you should also provide the `ConfigMap` with the
values expected for the test.

## Define your tests

The test suite is defined in a `tests` directory in your extension's root directory.

Tests are defined in YAML files. Each file contains a list of tests that are executed in order.

Theres one root key required in each test file:

- `tests`: A list of tests to execute.

You can use other keys to define YAML anchors and aliases.

Each test has a `name` key, which should be unique and descriptive.

A second key describes the type of test to execute. The following types are available:

- `validate`: Validate a resource.
- `defaulting`: Test defaulting of a resource.
- `sync`: Test syncing of a resource.
- `delete`: Test deletion of a resource.

### Validate

The `validate` test simulates a validation request for a resource.

The following keys are available:

- `type`: The type of validation to perform. Can be either `create`, `update` or `delete`.
- `invalid`: Whether the resource tested is invalid and the extension should return an error.
- `resource`: The resource to validate.

### Defaulting

The `defaulting` test simulates a defaulting request for a resource.

The following keys are available:

- `resource`: The resource to default.
- `expected`: The expected result of the defaulting request.

### Sync

The `sync` test simulates a sync request for a resource.

The following keys are available:

- `resource`: The resource to sync.
- `expected`: The expected result of the sync request.
- `lookup`: A list of resources to lookup. The extension should return these resources as part of the sync response.

### Delete

The `delete` test simulates a delete request for a resource.

The following keys are available:

- `resource`: The resource to delete.
- `notFound`: Whether the resource tested is not found and the extension should return an error.

## Example

The following example shows a test suite for an extension that creates an ingress.

```yaml
app: &app
  apiVersion: suffiks.com/v1
  kind: Application
  metadata: &metadata
    name: testapp
    namespace: testns
  spec:
    ingresses:
      - host: testapp.suffiks.com
        paths: ["/"]

config:
  INGRESSES: "*.suffiks.com"

tests:
  - name: Validate
    validate:
      type: update
      invalid: false
      resource: *app

  - name: Defaulting
    defaulting:
      resource:
        <<: *app
        spec:
          ingresses:
            - host: testapp2.suffiks.com
      expected:
        <<: *app
        spec:
          ingresses:
            - host: testapp2.suffiks.com
              paths: ["/"]

  - name: Sync
    sync:
      resource: *app
      expected:
        <<: *app
        metadata:
          <<: *metadata
          labels:
            is-wasm-controlled: "true"
      lookup:
        - kind: Ingress
          apiVersion: networking.k8s.io/v1
          metadata:
            name: testapp
            namespace: testns
            resourceVersion: null
            ownerReferences:
              - apiVersion: suffiks.com/v1
                kind: Application
                name: testapp
                uid: ""
                controller: true
          spec:
            ingressClassName: nginx
            rules:
              - host: testapp.suffiks.com
                http:
                  paths:
                    - path: /
                      pathType: Prefix
                      backend:
                        service:
                          name: testapp
                          port:
                            name: http

  - name: Validate delete
    validate:
      type: delete
      invalid: false
      resource: *app

  - name: Delete
    delete:
      resource: *app
      notFound:
        - kind: Ingress
          apiVersion: networking.k8s.io/v1
          metadata:
            name: testapp
            namespace: testns
```
