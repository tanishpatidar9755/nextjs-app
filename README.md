# Task Manager

A simple task CRUD app built with Next.js App Router. Tasks are saved in the
current browser using `localStorage`; no backend or database is configured.

## Project structure

```text
src/
  app/                 App Router pages, layout, and global styles
  components/
    tasks/             Task form, list, and page-level task manager
  lib/                 Browser storage helpers
  types/               Shared TypeScript types
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

- `npm run dev` — start the development server
- `npm run lint` — check the code with ESLint
- `npm run build` — create a production build
- `npm run start` — serve the production build
