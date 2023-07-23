---
title: "WASI overview"
description: "Write an extension using WASI."
lead: "Write an extension using WASI."
draft: false
images: []
menu:
  docs:
    parent: "wasi"
weight: 100
toc: true
---

A WASI extension is a WebAssembly module that implements the WASI interface.
The module is loaded by the Suffiks runtime and is used to provide the
extension's functionality.

If you want to write an extension, you can either use on of the existing
SDKs, or write your own. If you want to write your own, use the [runtime overview](../runtime)
page to see all the available runtime functions.

## When to use WASI

WASI is a good choice if your extension mainly modifies the workload's
environment.

It is possible to interact with custom resources, but it's not as easy
or efficient as implementing your own [GRPC service](/docs/extensions/grpc/introduction/).

## Suffiks SDKs

The following SDKs are available:

- [Go (TinyGo)](https://github.com/suffiks/suffiks-tinygo)
- [AssemblyScript](https://github.com/suffiks/suffiks-as)

See the respective repositories for more information.

## Configuration

Your extension can use configuration values by defining a `config` section
in your extension, which will be passed to the extension as environment variables.

## Documentation

Your extension can provide documentation by defining your pages as Markdown files
in a directory, and add the `--docs` flag to the `extgen wasi publish` command.

## Memory

Suffiks need to be able to allocate memory for your extension. Your extension must therefore
export the following functions:

- `malloc(size uint)`: Allocate memory.
- `free(ptr)`: Free memory.

## Publising your extension

Your extension must be published to a registry before it can be used.

Suffiks WASI extensions are published as custom OCI images.
It's recommended to use the `extgen wasi publish` command to publish your extension.

`extgen wasi publish` will build the image and publish it to the registry specified.

It requires a single argument, which is the path to the generated `.wasm` file.

The following flags are available:

| Flag                 | Description                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `--tag` **required** | The tag to use for the image. Should be the entire URL <br>(example: `ghcr.io/suffiks/examples/wasi/ingress-as:v0.0.5`) |
| `--docs`             | The directory containing the documentation pages.                                                                       |

Example:

```bash
extgen wasi publish --tag ${IMAGE} --docs ./docs build/release.wasm
```

## Examples

See the [examples repository](https://github.com/suffiks/examples/tree/main/wasi) for example extensions
using the WASI SDKs.
