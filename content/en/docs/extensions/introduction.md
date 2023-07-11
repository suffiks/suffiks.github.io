---
title: "Introduction"
description: "Learn why and how to write extensions for Suffiks."
lead: "Learn why and how to write extensions for Suffiks."
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

## Why extensions?

Suffiks is a platform for running applications and jobs. It is designed to be extensible and flexible. This means that you can write your own extensions to provide custom functionality to your applications and jobs.

With many companies choosing to create their own platforms for running applications and jobs, a lot of time is spent on building custom components to enhance the platform.
These enhancements are therefore often not shared, so other companies have to build the same components again.

Suffiks aims to solve this problem by providing a platform that is easy to extend and customize.

## How to write extensions

Suffiks allows you to write extensions in two ways, either by using WASI or by using GRPC servers.
These two ways aims to provide a way to write extensions in any language.

### GRPC

GRPC is a framework for writing remote procedure calls.
Suffiks uses GRPC to communicate with the extension.

GRPC gives you the ability to have full control over the runtime, as they run as a separate process.

If your extension mainly operates on Kubernetes resources, it's recommended to use GRPC and not WASI.

### WASI

WASI is a standard for running WebAssembly outside of the browser. It provides a way to run WebAssembly in a sandboxed environment.
Suffiks uses [wazero](https://wazero.io/) as a runtime, and provides a runtime for the extension to do basic operations.

As every WASI extension runs in the same pod as the Suffiks operator, it's not recommended to use WASI if your extension needs to do a lot of operations on Kubernetes resources.
