# Trisha Power and Automation — Website

Business website for **Trisha Power and Automation** (www.trishapower.in), built with React, Vite, TypeScript and Tailwind CSS v4. It uses Lucide icons and is ready to deploy on Vercel.

➡️ **Deploying? See [DEPLOYMENT.md](DEPLOYMENT.md).**

## Run and build locally

```bash
npm install          # Node 20.19+ (an .npmrc sets legacy-peer-deps)
npm run dev          # dev server at http://localhost:5173
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build at http://localhost:4173
npm run lint         # oxlint
```

## Pages

`/` Home · `/about` · `/services` · `/services/:slug` (9 service pages) · `/projects` · `/contact` · `/quote` (accepts `?service=<slug>`) · any other URL → 404 page.

## Where to edit content

| What | File |
| --- | --- |
| Phone, WhatsApp, email, address, map | `src/config/site.ts` |
| Company history, stats, certifications, facilities, makes | `src/config/company.ts` |
| Services (text, applications, benefits, scope, photo) | `src/data/services.ts` |
| Projects / gallery | `src/data/projects.ts` |
| Brand colours and fonts | `src/index.css` (`@theme`) |
| Logo (vector) | `src/components/Logo.tsx`, `public/favicon.svg` |

**Placeholders:** fields in `company.ts` start out empty. When they are empty they are hidden on the live site. In `npm run dev` they show as dashed yellow "placeholder" boxes, so you can see what still needs filling in. Publish only facts you can verify.

**Photos:** the service and project visuals are SVG illustrations in the brand colours (`src/components/PanelArt.tsx`). To use real photos, put them in `public/images/...` (about 1600px wide, JPG or WebP). Then set `image: '/images/...'` on the service or project entry.

## Contact / quote form

The form validates input and **never pretends to send**:

- **`VITE_INQUIRY_ENDPOINT` not set (default):** after validation, the visitor sees their enquiry pre-filled and two buttons: **Send via WhatsApp** (to +91-9890434730) and **Send via Email** (to sales.trishapower@gmail.com).
- **`VITE_INQUIRY_ENDPOINT` set:** the form POSTs JSON to that endpoint and shows a loading state, then a success message. If sending fails, it shows an error message with the WhatsApp/email fallback.

On Vercel, the included function `api/inquiry.ts` emails enquiries through Resend. Setup is in DEPLOYMENT.md, step 4. The client-side integration point is `src/lib/inquiry.ts`.

## Project structure

```
api/inquiry.ts        Vercel serverless function (optional email delivery)
public/               favicon, robots.txt, sitemap.xml (+ .htaccess/_redirects for non-Vercel hosts)
src/config/           site + company configuration
src/data/             services and projects content
src/components/       layout, header, footer, forms, cards, illustrations
src/pages/            one file per page (lazy-loaded)
vercel.json           Vercel build, SPA routing, caching and security headers
```
