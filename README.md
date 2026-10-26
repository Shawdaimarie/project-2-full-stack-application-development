# Rill

Rill is a front-end preview of a server-first web framework and its developer workspace. It presents the intended route, rendering, data, diagnostics, and deployment model in a responsive documentation experience.

The workspace view is a front-end prototype with representative sample data. It does not yet run a compiler, route server, data loaders, or deployment pipeline; those are the next implementation milestones. This keeps the preview honest about the boundary between the experience and the framework runtime.

## Run locally

Requires Node.js 20.19+ or 22.12+ and pnpm.

```sh
pnpm install
pnpm dev
```

Open the local URL Vite prints. The production bundle can be generated with:

```sh
pnpm build
pnpm preview
```

## Preview features

- Documentation navigation for routing, rendering, data and actions, and deployment.
- A responsive example route with parallel server data loading.
- A workspace mock-up with a route tree, editor, server-rendered preview, and expandable diagnostics.
- Theme toggle, mobile navigation, copy interaction, and accessible status feedback.

## Product roadmap

1. Add the file-based route scanner, typed route manifest, and nested server-rendering runtime.
2. Add streamed route states, validated server actions, and explicit cache controls.
3. Add a development server, compiler diagnostics, and a standard Node production target.
4. Validate the create-project-to-production path before adding platform adapters.
