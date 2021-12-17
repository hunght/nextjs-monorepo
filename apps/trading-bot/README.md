# The trading-bot

<p align="left">
  <a aria-label="Build" href="https://github.com/hunght/nextjs-monorepo/actions?query=workflow%3ACI">
    <img alt="build" src="https://img.shields.io/github/workflow/status/hunght/nextjs-monorepo/CI-trading-bot/main?label=CI&logo=github&style=flat-quare&labelColor=000000" />
  </a>
</p>

## Intro

Basic demo nextjs trading-bot, part of the [nextjs-monorepo-example](https://github.com/hunght/nextjs-monorepo).

- Homepage: [Demo/Vercel english](https://nextjs-monorepo-example-trading-bot.vercel.app/en/home) | [Demo/vercel french](https://nextjs-monorepo-example-trading-bot.vercel.app/fr/home)
- API: [Demo rest/Vercel](https://nextjs-monorepo-example-trading-bot.vercel.app/api/rest/post/1)
- [Changelog](https://github.com/hunght/nextjs-monorepo/blob/main/apps/trading-bot/CHANGELOG.md)

## Quick start

> For rest/api database access be sure to start `docker-compose up main-db`,
> see detailed instructions (seeding, docker, supabase...) in the [@nexttop.dev/db-main-prisma README](https://github.com/hunght/nextjs-monorepo/blob/main/packages/db-main-prisma/README.md).

```bash
$ yarn install
$ cd apps/trading-bot
$ yarn dev
```

### Features

> Some common features that have been enabled to widen monorepo testing scenarios.

- [x] Api routes: some api routes for rest.
- [x] I18n: based on [next-i18next](https://github.com/isaachinman/next-i18next)
- [x] Styling: [Emotion](https://emotion.sh/) support with critical path extraction enabled.
- [x] Styling: [Tailwind](https://tailwindcss.com/) with JIT mode enabled and common plugins.
- [x] Security: [next-secure-headers](https://github.com/jagaapple/next-secure-headers) with basic defaults.
- [x] Seo: [next-seo](https://github.com/garmeeh/next-seo)
- [x] Tests: Jest with ts-jest enabled

Database access for api's and server-side rendered

### Monorepo deps

This app relies on packages in the monorepo, see detailed instructions in [README.md](https://github.com/hunght/nextjs-monorepo)

```json5
{
  dependencies: {
    "@nexttop.dev/core-lib": "workspace:*",
    "@nexttop.dev/db-main-prisma": "workspace:*",
    "@nexttop.dev/ui-lib": "workspace:*",
  },
}
```

And their counterparts in [tsconfig.json](./tsconfig.json)

```json5
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@nexttop.dev/ui-lib/*": ["../../../packages/ui-lib/src/*"],
      "@nexttop.dev/ui-lib": ["../../../packages/ui-lib/src/index"],
      "@nexttop.dev/core-lib/*": ["../../../packages/core-lib/src/*"],
      "@nexttop.dev/core-lib": ["../../../packages/core-lib/src/index"],
      "@nexttop.dev/db-main-prisma/*": [
        "../../../packages/db-main-prisma/src/*",
      ],
      "@nexttop.dev/db-main-prisma": [
        "../../../packages/db-main-prisma/src/index",
      ],
    },
  },
}
```

## API routes

### Rest api

Try this route http://localhost:3000/api/rest/poem

### Graphql (sdl)

In development just open http://localhost:3000/api/graphql-sdl to have the graphiql console.

Try

```gql
query {
  allPoems {
    id
    title
  }
}
```

## Some tips

### I18N & typings

Translations are handled by [next-i18next](https://github.com/isaachinman/next-i18next).
See the [next-i18next.config.js](./next-i18next.config.js).
The keys autocompletion and typechecks are enabled in [./src/typings/react-i18next.d.ts](./src/typings/react-i18next.d.ts).

## Structure

```
.
├── apps
│   └── trading-bot
│       ├── public/
│       │   └── locales/
│       ├── src/
│       │   ├── backend/*     (backend code)
│       │   ├── components/*
│       │   ├── features/*    (regrouped by context)
│       │   └── pages/api     (api routes)
│       ├── .env
│       ├── .env.development
│       ├── (.env.local)*
│       ├── next.config.js
│       ├── next-i18next.config.js
│       ├── tsconfig.json    (local paths enabled)
│       └── tailwind.config.js
└── packages  (monorepo's packages that this app is using)
    ├── core-lib
    ├── main-db-prisma
    └── ui-lib
```

### Develop

```
$ yarn dev
```
