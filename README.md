<div align="center">

# Narayanan K — Portfolio

### DevSecOps & Security Engineer

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit%20Portfolio-red?style=for-the-badge&logo=vercel)](https://narayanan-k-infosec.github.io/Narayanan-Portfolio/)
[![Next.js](https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-222?style=for-the-badge&logo=github)](https://pages.github.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## About

Personal portfolio website for **Narayanan K**, a DevSecOps Analyst and Security Engineer with 4+ years of experience in Application Security (Web, Mobile, API), Cloud Security (AWS / GCP / Azure), and Container Security. Built with modern web technologies and secured by design.

> **Live:** [https://narayanan-k-infosec.github.io/Narayanan-Portfolio/](https://narayanan-k-infosec.github.io/Narayanan-Portfolio/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.x (App Router) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React + Custom SVGs |
| Font | Geist (Vercel) |
| Language | TypeScript |
| Deployment | GitHub Pages via GitHub Actions |
| Container | Docker (node:18-alpine, non-root) |

---

## Sections

- **Home** — Hero with role, social links, and key stats
- **About** — Background, quick info, and community memberships
- **Projects** — Featured security engineering projects with filters
- **Experience** — Professional timeline (M2P Fintech, Pepul)
- **Certifications** — In-progress and upcoming certification roadmap
- **Contact** — Contact form and direct social links

---

## Features

- Responsive, mobile-first design
- Active nav link tracking via `IntersectionObserver`
- Scroll progress bar and back-to-top button
- Scroll-down chevron in hero section
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy) via `next.config.js` for server/dev mode and `<meta>` tags for the static export
- `poweredByHeader: false` — suppresses `X-Powered-By`
- All external links use `rel="noopener noreferrer"`
- `window.open` calls include `noopener,noreferrer` feature string
- Docker container runs as non-root user (`nextjs:nodejs`)

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Narayanan-K-InFoSeC/Narayanan-Portfolio.git
cd Narayanan-Portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

Outputs a fully static site to the `out/` directory for GitHub Pages.

### Docker

```bash
# Build
docker build -t narayanan-portfolio .

# Run
docker run -p 3000:3000 narayanan-portfolio
```

The container runs as a non-root user (`UID 1001`) for improved security.

---

## Project Structure

```
Narayanan-Portfolio/
├── app/
│   ├── layout.tsx          # Root layout — security meta tags, CSP
│   ├── page.tsx            # All page sections (single-page app)
│   └── globals.css         # Global styles
├── public/
│   └── assets/             # Static assets (CV PDF, images)
├── .github/
│   └── workflows/
│       └── nextjs-prod.yml # GitHub Actions — build & deploy to Pages
├── Dockerfile              # Multi-stage Docker build (non-root runner)
├── next.config.js          # Next.js config + security headers
└── package.json
```

---

## Deployment

Deployment is fully automated via GitHub Actions on every push to `main`.

```
push to main
    └── GitHub Actions (nextjs-prod.yml)
            ├── npm ci
            ├── next build  →  out/
            └── deploy to GitHub Pages
```

The live site is available at:
**[https://narayanan-k-infosec.github.io/Narayanan-Portfolio/](https://narayanan-k-infosec.github.io/Narayanan-Portfolio/)**

---

## Certification Roadmap

| # | Certification | Issuer | Status |
|---|---|---|---|
| — | GCP Professional Cloud Security Engineer | Google Cloud | 🔵 In Progress |
| 01 | AWS Certified Security Specialty | Amazon Web Services | 🟡 Upcoming |
| 02 | ISC2 CCSP | ISC2 | 🟡 Upcoming |
| 03 | ISC2 CISSP | ISC2 | 🟡 Upcoming |
| 04 | OSCP+ | Offensive Security | 🟡 Upcoming |

---

## Contact

| Channel | Link |
|---|---|
| Email | [narayanan.k.infosec@gmail.com](mailto:narayanan.k.infosec@gmail.com) |
| LinkedIn | [linkedin.com/in/narayanan-k1](https://www.linkedin.com/in/narayanan-k1/) |
| GitHub | [github.com/Narayanan-K-InFoSeC](https://github.com/Narayanan-K-InFoSeC) |
| Location | Chennai, Tamil Nadu, India |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <strong>Narayanan K</strong> · Chennai, India
</div>
