# Katalyst Checkup Financiero

Privacy-first financial education and self-assessment platform built for community impact.

![Katalyst Checkup Preview](./docs/screenshots/landing.png)

## Overview

Katalyst Checkup Financiero helps users complete a private financial snapshot, understand their financial health, download a personalized PDF report, receive recommended learning modules, and optionally connect with Katalyst resources.

The product is designed for financial education and community support, with a local-first privacy model: users can complete the checkup without creating an account, and their answers remain on their device unless they explicitly choose to save progress.

## Why This Exists

Many people avoid financial planning tools because they feel intimidating, invasive, or judgmental. This product creates a respectful, accessible, and educational first step: a guided snapshot that turns household income, expenses, savings, debt, protection, dependents, and habits into a clear score, recommendations, and action plan.

The goal is not to replace financial advisors. It gives community members clarity, confidence, and a practical next step before they decide whether to learn more, download a report, create an account, or request support from Katalyst.

## Key Features

- Anonymous checkup with local-first data handling
- Score-first financial snapshot dashboard
- Deterministic scoring engine using income, expenses, debt, savings, dependents, protection, and financial habits
- Personalized recommendations and 30-day action plan
- Branded downloadable PDF report
- Financial education modules inspired by professional learning platforms
- Optional account flow for saving progress later
- Katalyst resources and contact flow
- Aggregate-only admin insights dashboard
- Supabase-ready schema and privacy model

## Product Screenshots

### Landing Page
![Landing](./docs/screenshots/landing.png)

### Checkup Flow
![Checkup](./docs/screenshots/checkup.png)

### Financial Snapshot
![Snapshot](./docs/screenshots/snapshot.png)

### Detailed Analysis
![Analysis](./docs/screenshots/analysis.png)

### PDF Report
![PDF](./docs/screenshots/pdf.png)

### Learning Path
![Learning](./docs/screenshots/learning.png)

### Admin Insights
![Admin](./docs/screenshots/admin.png)

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React
- Framer Motion
- jsPDF for structured multi-page PDF export
- React Hook Form / Zod installed for future form hardening
- localStorage local-first persistence for the MVP
- Supabase-ready schema draft for future production persistence

The current MVP is implemented in React JavaScript. The product architecture is intentionally modular so it can evolve into a TypeScript, Supabase, and Vercel production build without rewriting the scoring or UI flows.

## Privacy-First Architecture

Anonymous users can complete the checkup and download their report without creating an account. Their financial answers are processed locally and are not sent to a backend.

If a user creates an account later, they can choose whether to save their snapshot and track progress over time.

Admin dashboards must only show aggregate insights. Individual financial responses should not be visible to administrators unless a user voluntarily submits a support request.

## Scoring Methodology

The scoring engine is deterministic and explainable. It evaluates:

- Monthly income
- Monthly expenses
- Net monthly flow
- Savings rate
- Emergency fund months
- Debt-to-income ratio
- Housing burden
- Protection and planning signals
- Financial habits
- Household structure and dependents

The output includes:

- Score from 0-100
- Financial level
- Strengths
- Areas of attention
- Recommended modules
- 30-day action plan

The v1 scoring model weights the snapshot across cash flow, expense structure, emergency fund, debt burden, protection/planning, and habits/wellbeing. It is educational and orientative, not personalized financial advice.

## Product Architecture

```txt
checkup-financiero/
├── src/
│   ├── data/
│   │   ├── checkupQuestionBank.js
│   │   └── learningModules.js
│   ├── lib/
│   │   ├── financialCalculations.js
│   │   └── pdfExport.js
│   ├── pages/
│   │   ├── CheckupPage.jsx
│   │   ├── SnapshotPage.jsx
│   │   ├── SnapshotAnalysisPage.jsx
│   │   ├── ActionPlanPage.jsx
│   │   ├── LearnPage.jsx
│   │   └── AdminPage.jsx
│   └── utils/
│       └── storage.js
├── supabase_schema_draft.sql
└── package.json
```

The most important implementation boundary is `src/lib/financialCalculations.js`: it keeps the scoring model and derived financial metrics independent from the UI. This makes the product easier to test, explain, and later connect to Supabase.

## Local Development

```bash
cd checkup-financiero
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Future Production Path

The MVP runs as a static local-first product. A production version can add:

- Supabase Auth for optional accounts
- Row-level security for saved snapshots
- User-controlled consent before saving private financial data
- Learning progress synced across devices
- Admin aggregate analytics through secured views or RPCs
- Vercel deployment with environment-based configuration
- Legal-reviewed privacy, retention, and financial-disclaimer language

## Recruiter / Case Study Framing

This project converts a spreadsheet-based family budgeting methodology into a polished React financial wellness platform. It demonstrates product thinking, privacy-first architecture, deterministic scoring, financial data modeling, PDF generation, dashboard design, educational UX, and stakeholder-facing execution for a nonprofit/community context.
