---
title: "OCI Image Format"
description: "Suffiks WASI OCI images specification."
lead: "Suffiks WASI OCI images specification."
menu:
  docs:
    parent: "wasi"
weight: 10000
toc: true
---

{{< alert icon="🚧" context="warning" text="Specification not complete" />}}

Suffiks WASI extensions are published as custom OCI images.

The image must contain two layers, with the following media types:

- `application/vnd.com.suffiks.wasi.v1` (the .wasm file)
- `application/vnd.oci.image.manifest.v1+json` (the manifest)

If the extension contains documentation, it should be included as a third layer with the media type `application/vnd.com.suffiks.docs.layer.v1+tar`.  
The documentation layer must contain a single TAR file, which contains the directory with markdown files.
