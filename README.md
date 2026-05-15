# NAR & Tripoli Level 2 Test Prep

Free practice tests and study tools for the **NAR Level 2** and **Tripoli Level 2** high-power rocketry certification exams.

- Tripoli L2: 108-question bank (55 technical + 53 safety code). Practice exam draws 50 (25/25). Pass = 90%.
- NAR L2: 100-question bank (22 regs + 9 motor designations + 60 range/safety + 9 stability). Practice exam draws 40 (10/3/24/3). Pass = ~87%.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Static export (`output: "export"`) — deploys to any static host (Netlify, Cloudflare Pages, GitHub Pages, S3, etc.)
- `localStorage` for progress; no backend, no database, no accounts

## Local development

```sh
npm install
npm run dev               # http://localhost:3000
npm run dev:https         # https://localhost:3000 (auto-generated cert, good for HSTS testing)
npm run typecheck
npm run build             # produces ./out — the static site
```

## Deploy — GitHub Pages (automated)

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds, type-checks, and deploys to GitHub Pages on every push to `main`. Pull requests run build + typecheck as a CI gate but do not deploy (GitHub Pages has a single live environment). No secrets or tokens required — it uses the built-in `GITHUB_TOKEN`.

**One-time setup:**

1. **Enable Pages with the Actions source.** Repo → Settings → Pages → *Build and deployment* → Source: **GitHub Actions**.

2. **Custom domain DNS.** In the DNS for `austinthemighty.com`, add:
   ```
   CNAME   rockettestprep   austinthemighty.github.io
   ```
   The [`public/CNAME`](public/CNAME) file already tells GitHub Pages to serve the site at `rockettestprep.austinthemighty.com`.

3. **Enforce HTTPS.** After the domain verifies (Settings → Pages), tick **Enforce HTTPS**. GitHub provisions a Let's Encrypt cert automatically — can take a few minutes to an hour the first time.

Push to `main` and it deploys. The live URL appears in the workflow's `deploy` job summary.

### Security headers note

GitHub Pages does **not** support custom response headers, so HSTS, a real CSP header, and `X-Frame-Options` cannot be set there. As a best-effort substitute the app emits a `Content-Security-Policy` and `referrer` via `<meta>` tags ([app/layout.tsx](app/layout.tsx)). GitHub Pages still enforces HTTPS for the custom domain. If you later need full header control (HSTS preload, frame-ancestors), move the same `out/` bundle to Cloudflare Pages or Netlify and restore a `_headers` file — the build output is host-agnostic.

### Manual / other hosts

The site is just the static contents of `out/` after `npm run build`. It can be dropped on any static host:

```sh
npx wrangler pages deploy out          # Cloudflare Pages
npx netlify deploy --dir=out --prod    # Netlify
```

## Adding or fixing questions

Question banks live in [data/](data/) as JSON. Each entry is a [`Question`](lib/questions.ts):

```ts
{
  id: "nar-A-14",
  number: 14,
  cert: "nar",
  section: "regulations",
  topic: "Cloud / visibility",
  prompt: "...",
  options: [{ key: "A", text: "..." }, ...],
  correctAnswer: "B",
  explanation: "...",
  reference: "FAR 101.25"
}
```

Edit the JSON, run `npm run build`. The exam draws and the sitemap update automatically.

## Disclaimer

This site is an unofficial study aid. It is not affiliated with the National Association of Rocketry or the Tripoli Rocketry Association. Question content is reproduced from the publicly distributed NAR and Tripoli Level 2 study guides for educational purposes. Always verify against the current official study guides before taking the certification exam.
