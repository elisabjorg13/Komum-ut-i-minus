# Komum út í minus

Blank Next.js website with Prismic CMS and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Prismic / Slice Machine

1. Create a Prismic repository (or reuse an existing one).
2. Set the repository name in `.env.local` and `slicemachine.config.json`.
3. Run Slice Machine:

```bash
npm run slicemachine
```

Open [http://localhost:9999](http://localhost:9999) to create slices and custom types, then push them to Prismic.

## Tech Stack

- **Next.js 14** — App Router
- **Prismic** — headless CMS + Slice Machine
- **Tailwind CSS** — styling
- **TypeScript**
