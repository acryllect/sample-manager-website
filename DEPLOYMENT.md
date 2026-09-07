# Deployment — GitHub → Cloudflare Pages → Porkbun

Target domain: **samplelantern.com** (canonical apex; `www` redirects to it).

This site is a static Astro build — there is no server, no environment
variable required at runtime, and no Cloudflare Worker needed.

## 1. Push the repository to GitHub

If this website lives inside the same repository as the macOS app (Swift
package at the repo root), that's fine — Cloudflare Pages can build from a
subdirectory. If you'd rather keep them separate, this `website/` folder can
be extracted into its own repository with no changes.

```bash
git add website
git commit -m "Add SampleLantern website"
git push
```

## 2. Connect the GitHub repo to Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create application** →
   **Pages** → **Connect to Git**.
2. Select the GitHub repository (authorize Cloudflare's GitHub App if this is
   the first project).
3. Choose the project name (e.g. `samplelantern`).

## 3. Choose the production branch

Set the production branch to `main` (or whichever branch you treat as
canonical). Cloudflare Pages will build a preview deployment for every other
branch and pull request automatically — leave this on, it's useful for
reviewing copy changes before they go live.

## 4. Build configuration

| Setting | Value |
|---|---|
| Framework preset | Astro (or "None" — the settings below are explicit either way) |
| **Root directory** | `website` — set this if the repo also contains the Swift app at its root; leave blank if `website/` was extracted into its own repo |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| Node version | 20 or later (Cloudflare Pages' default is recent enough; set `NODE_VERSION=20` as an environment variable only if a build fails on an older default) |

No environment variables are required for the build itself. The site's
runtime configuration (`betaOpen`, `tallyFormUrl`, `demoVideoUrl`, etc.) lives
in `src/config/site.ts` and is baked in at build time — change it, commit,
and redeploy rather than reaching for env vars.

## 5. Deploy

Cloudflare builds and deploys automatically on push. The first deploy will be
reachable at `<project-name>.pages.dev` — use that to verify the build before
attaching the real domain.

## 6. Attach samplelantern.com

In the Pages project → **Custom domains** → **Add a custom domain**:

1. Add `samplelantern.com` (apex).
2. Add `www.samplelantern.com` as a second custom domain on the same
   project. Cloudflare will typically offer to redirect it to the apex — take
   that option if presented. If not, this repo already ships a
   [`public/_redirects`](public/_redirects) file that performs the same
   301 redirect at the edge as a fallback.
3. Follow Cloudflare's on-screen instructions for the exact DNS records to
   create — Cloudflare generates these per-project and per-domain-status
   (whether the zone is already on Cloudflare or not), so copy them from the
   dashboard rather than assuming a fixed CNAME/A-record target here.

## 7. Porkbun DNS configuration

If `samplelantern.com` is registered at Porkbun and DNS is **not** yet
delegated to Cloudflare:

1. In Porkbun, open the domain → **DNS** (or **NS** if moving nameservers
   entirely to Cloudflare, which is the simpler path for a Cloudflare Pages
   site — Cloudflare will show you the two nameservers to set at Porkbun
   during zone setup).
2. Either:
   - **Delegate the zone to Cloudflare** (recommended): add the domain as a
     zone in Cloudflare first, copy the two assigned nameservers, and set
     those as the domain's nameservers in Porkbun ("NS" settings, not just a
     DNS record). This lets Cloudflare manage all DNS, including the
     Pages-specific records, automatically.
   - **Keep DNS at Porkbun** and add only the specific records Cloudflare's
     custom-domain flow asks for (typically a `CNAME` at the apex via
     Porkbun's ALIAS/ANAME support, plus one for `www`). Use this only if you
     have a reason not to move the zone to Cloudflare.
3. Propagation can take anywhere from a few minutes to ~24 hours.

## 8. www → apex redirect

Covered in step 6 — either Cloudflare's custom-domain redirect option or the
shipped `public/_redirects` file. Verify after DNS propagates:

```bash
curl -I https://www.samplelantern.com
# expect: HTTP/2 301, location: https://samplelantern.com/
```

## 9. HTTPS verification

Cloudflare Pages provisions and renews TLS certificates automatically for
attached custom domains — no action needed beyond waiting for the certificate
to issue after DNS points at Cloudflare. Confirm with:

```bash
curl -I https://samplelantern.com
# expect: HTTP/2 200
```

If it fails, check the custom domain's status in the Pages dashboard — it
will show "Verifying," "Pending," or an explicit DNS error rather than
failing silently.

## 10. Deployment smoke test

After the domain is live, check by hand:

- [ ] `https://samplelantern.com/` loads over HTTPS with a valid certificate
- [ ] `https://www.samplelantern.com/` redirects to the apex
- [ ] `/apply`, `/demo`, `/support`, `/system-requirements`, `/known-issues`,
      `/privacy`, `/terms`, `/refunds` all load (no 404s)
- [ ] `/robots.txt` and `/sitemap-index.xml` are reachable
- [ ] View source on `/` — confirm `betaOpen`, `tallyFormUrl`, and
      `checkoutUrl` reflect what you intend to expose publicly (this repo
      defaults to `betaOpen: false` and an empty `checkoutUrl`, meaning no
      public checkout is ever exposed regardless of this flag)
- [ ] No console errors in the browser devtools on `/`

## Ongoing deploys

Every push to the production branch redeploys automatically. To update
copy, screenshots, the demo video, or flip `betaOpen`/`tallyFormUrl` when the
application opens: edit the relevant file, commit, push — no manual
Cloudflare step required.
