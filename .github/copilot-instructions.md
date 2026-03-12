Project: ECOVENT — AI coding assistant instructions

Summary
- Single-repo app with a Vite React frontend and an Express/trpc backend.
- Frontend lives in `client/` (Vite root). Backend code lives in `server/` and is bundled to `dist` for production.

Quick dev commands (use pnpm):
- Install: `pnpm install` (project uses pnpm; `packageManager` set in `package.json`).
- Dev: `pnpm dev` — runs `tsx watch server/_core/index.ts` which starts the Express server and Vite in development.
- Build: `pnpm build` — runs `vite build` then bundles the server with `esbuild` to `dist`.
- Start (production): `pnpm start` — runs the bundled server at `dist/index.js`.
- Tests: `pnpm test` (runs `vitest`).
- DB migrations: `pnpm run db:push` (uses `drizzle-kit`).

Architecture notes (big picture)
- Frontend: Vite root is `client/`. Aliases are configured in [vite.config.ts](vite.config.ts#L1) — `@` -> `client/src`, `@shared` -> `shared`.
- Backend: Express + tRPC. tRPC router is at [server/routers.ts](server/routers.ts#L1) and the server bootstrapping is at [server/_core/index.ts](server/_core/index.ts#L1).
- Dev server: `server/_core/index.ts` integrates Vite (HMR) in development via `setupVite()` and serves static `dist/public` in production.
- API surface: all RPC endpoints are under `/api/trpc` (see `createExpressMiddleware` usage in [server/_core/index.ts](server/_core/index.ts#L1)).
- Database: Drizzle ORM with schema at `drizzle/schema.ts` and migrations in `drizzle/migrations/`.

Important patterns & conventions
- tRPC conventions: use `publicProcedure`, `protectedProcedure`, and `adminProcedure` from `server/_core/trpc.ts` which enforces authentication and admin role checks (admin role is the literal string `admin`). See [server/_core/trpc.ts](server/_core/trpc.ts#L1).
- Transformer: tRPC uses `superjson` (important when serializing Dates/complex types).
- Bilingual content: many DB fields are language-specific pairs (e.g. `nameAr` / `nameEn`, `titleAr` / `titleEn`) — preserve both when editing APIs or UI.
- Date inputs on some admin routes are passed as strings and converted to `Date` in `routers.ts` (see project create/update handlers). Follow that pattern when adding routes.
- File uploads: admin upload route expects a base64 `file` and `folder` enum (`products|projects|services`) and uses `storagePut()` from [server/storage.ts](server/storage.ts#L1).
- Cookie & auth: cookie name is defined in [shared/const.ts](shared/const.ts#L1) as `app_session_id`. Use that constant rather than hardcoding the name.
- Large request bodies: server body parser is configured with larger limits (`50mb`) in [server/_core/index.ts](server/_core/index.ts#L1) (for file uploads and LLM payloads).

LLM / AI integration
- The LLM client is implemented in [server/_core/llm.ts](server/_core/llm.ts#L1). It calls a forge API endpoint by default and expects `ENV.forgeApiKey`.
- The AI endpoints live in `server/routers.ts` under `ai` (e.g. `generateVentilationDesign`, `chat`) and call `invokeLLM()`; read `invokeLLM` for supported params and response shapes.

Build & deployment details
- Vite output: `vite build` writes client assets to `dist/public` (see [vite.config.ts](vite.config.ts#L1)).
- Server bundling: `esbuild` bundles `server/_core/index.ts` into `dist` (the start script runs `dist/index.js`).

Environment variables & secrets
- Primary envs used by server/llm/storage: `forgeApiKey`, `forgeApiUrl`, `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` (used by `server/storage.ts` and `server/_core/llm.ts`).
- Vite `envDir` is project root (set in [vite.config.ts](vite.config.ts#L1)).

Where to edit common code
- Frontend UI: `client/src/` — components, hooks, pages live here. Example page: [client/src/pages/Products.tsx](client/src/pages/Products.tsx#L1).
- Shared types/constants: `shared/` — use `@shared` alias from the frontend.
- Server logic and API: `server/` — `routers.ts` defines the public RPC surface; DB helpers live in `server/db.ts` and `drizzle/`.

Quick tips for AI agents
- Prefer editing small, focused files and run `pnpm dev` to validate frontend+backend HMR.
- When changing API shapes, update `server/routers.ts`, the matching DB helpers in `server/db.ts`, and the frontend calls (`client/src/lib/trpc.ts` and consuming pages/components).
- Use `superjson`-compatible shapes for responses (Dates are supported). Check `server/_core/trpc.ts` for transformer config.
- For file upload flows, follow the existing pattern: frontend sends base64, backend decodes and uses `storagePut()` — see upload handler in [server/routers.ts](server/routers.ts#L1).

If anything here is unclear or you'd like this shortened/expanded into checklist form, say which areas to refine.
