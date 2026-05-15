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

## Deploy

Build first: `npm run build`. The site is the contents of `out/`.

### Cloudflare Pages — automated via GitHub Actions (recommended)

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and deploys on every push to `main`, and posts a preview URL on every pull request.

**One-time setup:**

1. **Create the Cloudflare Pages project** (only needed once)
   ```sh
   npx wrangler pages project create nar-tripoli-l2 --production-branch=main
   ```
   Or in the Cloudflare dashboard → Workers & Pages → Create application → Pages → Connect to Git (or upload assets). The project name must match `CF_PROJECT_NAME` in the workflow (`nar-tripoli-l2`).

2. **Create a scoped API token**
   - https://dash.cloudflare.com/profile/api-tokens → Create Token → Custom token
   - Permissions: **Account → Cloudflare Pages → Edit**
   - Account Resources: include your account
   - Copy the token.

3. **Find your Account ID**
   - https://dash.cloudflare.com → right sidebar of any zone, or `npx wrangler whoami`.

4. **Add GitHub repository secrets** (Settings → Secrets and variables → Actions → New repository secret):
   - `CLOUDFLARE_API_TOKEN` — the token from step 2
   - `CLOUDFLARE_ACCOUNT_ID` — the ID from step 3

That's it. Push to `main` and the workflow deploys to production. Open a PR and you'll get a preview URL commented on the PR.

### Cloudflare Pages — manual deploy

```sh
npx wrangler pages deploy out --project-name nar-tripoli-l2
```

### Netlify

```sh
npx netlify deploy --dir=out --prod
```

Or connect the repo with build command `npm run build`, publish directory `out`. TLS is automatic.

### Custom domain

Add the domain in the host's dashboard, point DNS at the host's nameservers (CF) or `A`/`CNAME` records (Netlify), and a Let's Encrypt cert is issued automatically within a few minutes. The `_headers` file in this repo turns on HSTS so once the domain is HTTPS, browsers will refuse to downgrade.

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
