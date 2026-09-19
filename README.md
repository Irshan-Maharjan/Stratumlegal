This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying to Hostinger (shared hosting)

Shared hosting serves files through Apache/LiteSpeed and cannot run Node, so
the site is built as a **static export** (`output: 'export'` in
`next.config.ts`). `next build` writes an `out/` directory; upload its
**contents** — not the folder itself — into `public_html`.

`public/.htaccess` is copied into the export automatically and handles the
404 page, caching and the HTTPS redirect.

### Preview / staging build

While the site is on a temporary domain for review, pass that domain at build
time. This keeps the sitemap, canonical tags and OG URLs pointing at the
preview, and emits `Disallow: /` plus a `noindex, nofollow` tag so the
preview cannot be indexed and later compete with the real domain as duplicate
content:

```bash
NEXT_PUBLIC_SITE_URL=https://your-preview-domain.com npm run build
```

### Production build

Build with no env var. `SITE_URL` falls back to `PRODUCTION_URL` in
`src/config/firm.ts`, and indexing turns itself back on — no code change:

```bash
npm run build
```

Confirm before uploading a production build:

```bash
grep -c noindex out/index.html   # expect 0
head -4 out/robots.txt           # expect "Allow: /"
```

### Notes

- `next/image` optimisation is off (`unoptimized: true`) — it needs a server.
  Size and compress any new image before committing it; the build will not.
- The enquiry form at `/contact` is still a stub: it validates and fakes
  success but sends nothing. It needs a third-party form service (Formspree,
  Web3Forms) to work on static hosting.
