---
title: "Introduction"
description: "Write an extension using GRPC."
lead: "Write an extension using GRPC."
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "extensions"
weight: 100
toc: true
---

## Proto schema

Your extension should generate a server from the Suffiks Extension proto schema found in the [suffiks/suffiks repository](https://github.com/suffiks/suffiks/blob/main/extension/proto/extension.proto).

If you like Go, we recommend using our [wrapper framework](../go).

## Functions

### Sync

The `Sync` function is called whenever Suffiks needs to synchronize the state of the extension with the state of the cluster.
This function is called periodically and should be idempotent.

If you create resources in the cluster, you should add the owner reference provided in the `SyncRequest` to your resources.

### Delete

The `Delete` function is called whenever the workload is deleted, or the fields your extension is responsible for is removed.
This function might be called multiple times, and should be idempotent.

### Default

The `Default` function is called whenever Suffiks receives a [Mutatiing webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) from the Kubernetes API server.
The only side effect this function should have is to set default values on the object, which is done by returing a `JSONPatch` in the `DefaultResponse`.

### Validate

The `Validate` function is called whenever Suffiks receives a [Validating webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) from the Kubernetes API server.
This function should only validate the object, and return one or more `ValidationError` in the `ValidateResponse` if the object is invalid.

### Documentation

The `Documentation` function is called whenever Suffiks needs to retrieve the documentation for the extension.
Even if you don't have any documentation, you should return an empty `DocumentationResponse`.
