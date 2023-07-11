---
title: "Runtime"
description: "WASI Suffiks runtime."
lead: "WASI Suffiks runtime."
menu:
  docs:
    parent: "wasi"
weight: 1000
toc: true
---

## Module `suffiks`
All the following functions are available in the `suffiks` module.

This documentation is generated from the [WASI env](https://github.com/suffiks/suffiks/blob/wasi/extension/wasi/wasi_env.json) generated file,
which you can use to generate your own code.

### AddEnv

addEnv adds an environment variable to the workload.

`ptr` and `size` are the pointer and size of the serialized
KeyValue proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### AddEnvFrom

addEnvFrom adds an environment variable from a secret or configmap to the workload.

`ptr` and `size` are the pointer and size of the serialized
EnvFrom proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### AddLabel

addLabel adds a label to the workload.

`ptr` and `size` are the pointer and size of the serialized
KeyValue proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### AddAnnotation

addAnnotation adds an annotation to the workload.

`ptr` and `size` are the pointer and size of the serialized
KeyValue proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### AddInitContainer

addInitContainer adds an init container to the workload.

`ptr` and `size` are the pointer and size of the serialized
Container proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### AddSidecar

addSidecar adds a sidecar to the workload.

`ptr` and `size` are the pointer and size of the serialized
Container proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### MergePatch

mergePatch applies a merge patch to the workload.

`ptr` and `size` are the pointer and size of the serialized
MergePatch JSON.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### ValidationError

validationError adds a validation error during a validation request.

`ptr` and `size` are the pointer and size of the serialized
ValidationError proto.

**Arguments**

* `ptr` (`uint32`)
* `size` (`uint32`)

### GetOwner

getOwner returns the OwnerReference proto of the workload.

The returned value is a uint64 which uses the first 32 bits to
store the pointer, and the last 32 bits to store the size.

**Returns**

* `uint64`

### GetSpec

getSpec returns the Spec JSON of the workload.

The returned value is a uint64 which uses the first 32 bits to
store the pointer, and the last 32 bits to store the size.

**Returns**

* `uint64`

### GetOld

getOld returns the Old JSON of the workload.

This is only valid for validation requests.

The returned value is a uint64 which uses the first 32 bits to
store the pointer, and the last 32 bits to store the size.

**Returns**

* `uint64`

### CreateResource

createResource creates a resource in the Kubernetes API server.
`gvrPtr` and `gvrSize` are the pointer and size of the serialized
GroupVersionResource proto.

`specPtr` and `specSize` are the pointer and size of the serialized
Resource json.

**Arguments**

* `gvrPtr` (`uint32`)
* `gvrSize` (`uint32`)
* `specPtr` (`uint32`)
* `specSize` (`uint32`)

**Returns**

* `uint64`

### UpdateResource

updateResource updates a resource in the Kubernetes API server.

`gvrPtr` and `gvrSize` are the pointer and size of the serialized
GroupVersionResource proto.

`specPtr` and `specSize` are the pointer and size of the serialized
Resource json.

**Arguments**

* `gvrPtr` (`uint32`)
* `gvrSize` (`uint32`)
* `specPtr` (`uint32`)
* `specSize` (`uint32`)

**Returns**

* `uint64`

### DeleteResource

deleteResource deletes a resource from the Kubernetes API server.

`gvrPtr` and `gvrSize` are the pointer and size of the serialized
GroupVersionResource proto.
`namePtr` and `nameSize` are the pointer and size of the serialized
string name of the resource.

**Arguments**

* `gvrPtr` (`uint32`)
* `gvrSize` (`uint32`)
* `namePtr` (`uint32`)
* `nameSize` (`uint32`)

**Returns**

* `uint64`

### GetResource

getResource returns a resource from the Kubernetes API server.

`gvrPtr` and `gvrSize` are the pointer and size of the serialized
GroupVersionResource proto.
`namePtr` and `nameSize` are the pointer and size of the serialized
string name of the resource.

**Arguments**

* `gvrPtr` (`uint32`)
* `gvrSize` (`uint32`)
* `namePtr` (`uint32`)
* `nameSize` (`uint32`)

**Returns**

* `uint64`

