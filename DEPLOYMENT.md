# Deploying the Trisha Power website on Vercel

This guide takes the website from this folder to **https://www.trishapower.in** on Vercel. Allow about 20–30 minutes; most of that is DNS.

The project is already configured for Vercel:

| File | What it does |
| --- | --- |
| `vercel.json` | Vite build settings, output folder `dist`, routing so URLs like `/services/pcc-panels` work on refresh, a `trishapower.in → www.trishapower.in` redirect, long-term caching for assets, security headers |
| `api/inquiry.ts` | Optional serverless function that emails form enquiries (step 4) |
| `.npmrc` | Makes `npm install` succeed on Vercel (`legacy-peer-deps`) |
| `package.json` → `engines` | Requires Node 20.19 or newer (Vercel's default Node 22 is fine) |

---

## Before you start

- A **Vercel account**: https://vercel.com/signup (the free Hobby plan works; a business may prefer Pro).
- A **GitHub account**, recommended so every push redeploys automatically. Alternatively, use the Vercel CLI (Option B).
- Access to the **DNS settings for trishapower.in** at the domain registrar (GoDaddy, Hostinger, BigRock, etc.).
- Check that the project builds locally:
  ```bash
  npm install
  npm run build
  ```

---

## Step 1 — Put the code on GitHub (Option A, recommended)

```bash
cd /path/to/TRISHA
git init
git add .
git commit -m "Trisha Power website"
```

1. On GitHub, create a new **private** repository, e.g. `trisha-power-website`. Do not add a README.
2. Push the code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-account>/trisha-power-website.git
   git push -u origin main
   ```

`node_modules`, `dist` and `.env` are excluded by `.gitignore`. Never commit API keys.

## Step 2 — Import the project into Vercel

1. Go to https://vercel.com/new and choose **Import Git Repository**. Select `trisha-power-website` and authorise GitHub access if asked.
2. On the configure screen, these values are read from `vercel.json` automatically. Check them:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Root Directory:** `./`
3. Leave environment variables empty for now; step 4 is optional.
4. Click **Deploy**. After about a minute you get a URL like `https://trisha-power-website.vercel.app`.

### Option B — Deploy with the Vercel CLI (no GitHub)

```bash
npm i -g vercel
vercel login
vercel          # first run: answer the prompts and accept the detected settings → preview URL
vercel --prod   # deploy to production
```

## Step 3 — Check the deployment

Open the `*.vercel.app` URL and check:

- [ ] Home, About, Services, each service page, Projects, Contact and Request a Quote all load.
- [ ] **Refreshing** on a deep link such as `/services/apfc-panels` still loads the page (not a Vercel 404).
- [ ] An unknown URL such as `/xyz` shows the site's own "Page not found" page.
- [ ] The **call** button dials +91-9209904072 and the **WhatsApp** button opens a chat with +91-9890434730.
- [ ] The **email** link opens a message to sales.trishapower@gmail.com.
- [ ] The contact form shows validation errors, then the WhatsApp/Email hand-off (or the success message if step 4 is done).
- [ ] The map loads on the Contact page.
- [ ] Mobile view: the menu opens and closes, and nothing scrolls sideways.

## Step 4 (optional) — Make the forms email enquiries directly

Without this step, the forms send the visitor's details through **WhatsApp or email from the visitor's own phone or mail app**. This works, but it depends on the visitor completing that last tap. With this step, enquiries arrive in the sales inbox automatically.

1. **Create a Resend account** at https://resend.com (the free tier covers typical enquiry volume).
2. **Verify the domain:** in Resend, go to **Domains → Add Domain → `trishapower.in`**. Resend shows a few DNS records (TXT/MX for SPF and DKIM). Add them at the registrar and wait until Resend shows **Verified**.
   - Until the domain is verified, Resend's test sender `onboarding@resend.dev` only delivers to the email address of the Resend account owner.
3. **Create an API key:** go to **API Keys → Create** with "Sending access" permission, and copy the key (`re_...`).
4. In **Vercel → your project → Settings → Environment Variables**, add the following for the *Production* and *Preview* environments:

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | `re_xxxxxxxx` (keep secret) |
   | `INQUIRY_FROM_EMAIL` | `Trisha Power Website <website@trishapower.in>` |
   | `INQUIRY_TO_EMAIL` | `sales.trishapower@gmail.com` (or another inbox) |
   | `VITE_INQUIRY_ENDPOINT` | `/api/inquiry` |

5. **Redeploy.** Go to **Deployments → ⋯ on the latest → Redeploy**. This is required because `VITE_INQUIRY_ENDPOINT` is built into the site at build time.
6. Submit a test enquiry on the live site. It should show **"Thank you — your message has been sent"**, and the email arrives with **Reply-To** set to the visitor's address, so the team can just press Reply.

If emails fail, open **Vercel → Project → Logs** and filter by `/api/inquiry`. A `503` response means `RESEND_API_KEY` is missing. A `502` means Resend rejected the message, usually because the domain is not verified or the from-address is wrong. In both cases, visitors still see the WhatsApp/email fallback, so no enquiry is lost.

> Prefer a different form service, such as Formspree or Web3Forms? Set `VITE_INQUIRY_ENDPOINT` to that service's JSON endpoint instead and skip the Resend variables.

## Step 5 — Connect www.trishapower.in

1. In **Vercel → Project → Settings → Domains**, add **`www.trishapower.in`** and **`trishapower.in`**.
   - Set `www.trishapower.in` as the primary domain. `vercel.json` already redirects the bare domain to `www`.
2. Vercel shows the exact DNS records to add. They are usually:

   | Type | Name / Host | Value |
   | --- | --- | --- |
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   Always use the values Vercel shows in your dashboard, since they can differ per project.
3. At the registrar's DNS panel:
   - **Remove** any existing `A` record for `@` and `CNAME` for `www` that point to the old host. If the domain uses "parking" or "forwarding", turn it off.
   - Add the records above.
   - **Do not touch** the `MX` records if the domain receives email, nor the Resend TXT/MX records from step 4.
4. DNS changes usually take minutes, but can take up to 24–48 hours. Vercel issues the **HTTPS certificate automatically** once the domain status shows **Valid Configuration**.

## Step 6 — After going live

- **Google Search Console** (https://search.google.com/search-console): add the property `https://www.trishapower.in`, verify it with a DNS TXT record, and submit `https://www.trishapower.in/sitemap.xml`.
- **Google Business Profile:** link the website for local search ("electrical panel manufacturer Pune").
- **Analytics (optional):** enable **Vercel Web Analytics** under Project → Analytics. No code changes are needed for basic page views; see Vercel's docs if you want to add the `@vercel/analytics` package.
- Fill in real company facts in `src/config/company.ts` and real project photos in `src/data/projects.ts`, then push to GitHub to redeploy.

## Updating the site later

With GitHub connected, every push redeploys automatically:

```bash
# edit content, e.g. src/config/site.ts or src/data/services.ts
npm run build        # optional local check
git add . && git commit -m "Update contact details"
git push             # Vercel builds and deploys in about a minute
```

- Pushes to other branches or pull requests get their own **preview URL**, so changes can be checked before merging to `main`.
- To **roll back**, go to Vercel → Deployments → choose an earlier deployment → **⋯ → Promote to Production**.
- If you add a new service, also add its URL to `public/sitemap.xml`.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Build fails with `ERESOLVE` / peer dependency errors | Make sure `.npmrc` (containing `legacy-peer-deps=true`) is committed. |
| Build fails with a Node version error | Vercel → Settings → General → Node.js Version → 20.x or 22.x. |
| 404 when refreshing a page like `/about` | Make sure `vercel.json` is committed at the project root, and the Framework Preset is Vite. |
| Form still shows WhatsApp/Email after step 4 | `VITE_INQUIRY_ENDPOINT` was added after the last build. Redeploy. |
| Form shows "could not be sent" | Check the function logs (step 4). A `503` means a missing API key; a `502` means the domain is not verified in Resend. |
| Domain shows "Invalid Configuration" | DNS records don't match yet, or old records are still present. Recheck and wait for propagation. |
| Old site still shows | DNS cache. Try mobile data or another network, or wait a few hours. |
