# Raynell Portfolio

Personal portfolio site for **Raynell Vick F. Abuan** — a Magna Cum Laude Computer Science graduate. Built with **Next.js** (static export), **TypeScript**, and **Tailwind CSS**. Content is driven by Markdown files.

## Features

- Responsive landing page: hero, about, skills, projects, resume, contact
- Markdown-driven project case studies with frontmatter
- Dark / light theme toggle (system-aware)
- Accessible tooltips, skeleton loaders, and subtle animations
- Downloadable `resume.pdf` + HTML resume page
- Alternate HTML resume variants (software, IT support, networking, general tech)
- Static export optimized for **Vercel**
- GitHub Actions CI on push to `main`

## Quick Start

```bash
git clone <your-repo-url>
cd Portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production static build (outputs to `out/`) |
| `npm run start` | Serve production build (after build) |
| `npm run lint` | Run ESLint |
| `node scripts/generate-resume.js` | Instructions for exporting HTML resumes to PDF |

## Project Structure

```
content/projects/          # Markdown project files (YAML frontmatter)
public/
  images/                  # Profile photo, project images
  resume.pdf               # Downloadable resume
src/
  app/                     # Next.js App Router pages
  components/              # Header, Footer, ProjectCard, Tooltip, etc.
  lib/
    content.ts             # Markdown loader
    site.ts                # Site config & skills
    resume.ts              # Resume variant data
scripts/
  generate-resume.js       # PDF export helper instructions
```

## Editing Content

### Site info (name, about, skills, contact)

Edit `src/lib/site.ts`.

### Add or edit a project

1. Create `content/projects/your-project-slug.md`
2. Include frontmatter:

```yaml
---
title: Project Name
slug: your-project-slug
date: 2025-01-01
description: One or two line summary
tech: [React, Node.js]
repo: https://github.com/rynllvck5/your-repo
featuredImage: /images/projects/your-image.svg
featured: true
role: Your Role
problem: What problem did it solve?
approach: How did you approach it?
results:
  - Result bullet one
  - Result bullet two
---
```

3. Add an image to `public/images/projects/`
4. Rebuild — static pages are generated at build time

### Resume

- **PDF:** Replace `public/resume.pdf`
- **HTML (primary):** Edit `src/lib/resume.ts` → `softwareResume`
- **Alternate variants:** `itSupportResume`, `networkingResume`, `generalTechResume`
- Preview alternates at `/resume/it-support`, `/resume/networking`, etc.

## Theming

Colors and tokens live in `tailwind.config.ts`:

- Accent: `accent` (teal `#0d9488`)
- Dark mode: `class` strategy via `next-themes`

Change accent colors in the `theme.extend.colors` section.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — no extra config needed
5. Deploy — every push to `main` triggers a new deployment

`vercel.json` sets long cache headers for static assets.

### GitHub Actions

CI runs lint + build on push/PR to `main` (`.github/workflows/ci.yml`).

## Performance & Caching

- Static export — no runtime server required
- Images use lazy loading with responsive `sizes`
- Vercel cache headers for `/images/*`, JS, CSS (1 year, immutable)
- Skeleton loaders on project list and detail pages

## Optional Next Steps

- Add project screenshots/GIFs to replace SVG placeholders
- Add Plausible or Google Analytics
- Add contact form with Vercel serverless function
- Add blog posts in `content/blog/`
- Netlify CMS or Sanity for non-developer editing

## License

Private portfolio — all rights reserved.
