import Grpc from "../GRPC.svelte";
import Wasi from "../WASI.svelte";
import Logo from "../logo.svelte";

export const code = [
  {
    lines: {
      apiVersion: "suffiks.io/v1",
      kind: "Application",
      metadata: {
        name: "my-application",
      },
      spec: undefined,
    },
  },
  {
    indent: 1,
    lines: {
      image: "my-image:latest",
      port: 3000,
    },
    service: "suffiks",
  },
  {
    indent: 1,
    lines: {
      ingresses: [
        {
          host: "suffiks.io",
          paths: ["/"],
        },
      ],
    },
    service: "ingresses",
  },
  {
    indent: 1,
    lines: {
      proxy: true,
    },
    service: "proxy",
  },
];

export const services = [
  {
    id: "suffiks",
    name: "Suffiks",
    description: "The base resource provided by Suffiks",
    component: Logo,
  },
  {
    id: "ingresses",
    name: "Ingresses",
    description: "A GRPC Extension providing Ingress-resources",
    component: Grpc,
  },
  {
    id: "proxy",
    name: "HTTP Proxy",
    description: "A WASI Extension adding an environment variable",
    component: Wasi,
  },
];

export const resources = [
  {
    id: "deployment",
    service: "suffiks",
    code: [
      {
        lines: {
          apiVersion: "apps/v1",
          kind: "Deployment",
          metadata: {
            name: "my-application",
          },
          spec: {
            replicas: 1,
            selector: {
              matchLabels: {
                "app.kubernetes.io/name": "MyApp",
              },
            },
            template: {
              metadata: {
                labels: {
                  "app.kubernetes.io/name": "MyApp",
                },
              },
              spec: {
                image: "my-image:latest",
                ports: [{ containerPort: 3000, name: "http" }],
              },
            },
          },
        },
        service: "suffiks",
      },
      {
        indent: 3,
        lines: {
          env: [
            { key: "HTTP_PROXY", value: "proxy:8080" },
            { key: "HTTPS_PROXY", value: "proxy:8080" },
          ],
        },
        service: "proxy",
      },
    ],
  },

  {
    id: "service",
    service: "suffiks",
    code: [
      {
        lines: {
          apiVersion: "v1",
          kind: "Service",
          metadata: {
            name: "my-application",
          },
          spec: undefined,
        },
      },
      {
        indent: 1,
        lines: {
          selector: { "app.kubernetes.io/name": "MyApp" },
          ports: [
            { protocol: "TCP", port: 80, targetPort: "http", name: "http" },
          ],
        },
        service: "suffiks",
      },
    ],
  },

  {
    id: "ingress",
    service: "ingresses",
    code: [
      {
        indent: 0,
        lines: {
          apiVersion: "networking.k8s.io/v1",
          kind: "Ingress",
          metadata: {
            name: "my-application",
          },
          spec: {
            rules: [
              {
                http: {
                  paths: [
                    {
                      path: "/",
                      pathType: "Prefix",
                      backend: {
                        service: {
                          name: "my-application",
                          port: { name: "http" },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        service: "ingresses",
      },
    ],
  },
];
