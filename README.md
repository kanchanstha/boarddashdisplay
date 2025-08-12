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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Overview
This frontend dashboard provides a comprehensive interface for managing bookings, viewing analytics, and controlling the Telegram bot. Built with Next.js 14's App Router and shadcn/ui components, it offers a modern, performant, and accessible user experience.
Key Principles

Component-First: Built with reusable shadcn/ui components
Type-Safe: Full TypeScript coverage with strict mode
Responsive: Mobile-first design that works on all devices
Accessible: WCAG 2.1 AA compliant
Performant: Optimized for Core Web Vitals
Real-time: Live updates via Server-Sent Events

✨ Features
Dashboard Pages

Overview Dashboard: Real-time metrics and KPIs
Bookings Management: Full CRUD with filters and search
Customer Profiles: Customer history and preferences
Analytics: Interactive charts and reports
Bot Configuration: Manage bot settings and responses
Settings: User preferences and system configuration

UI Components

Data Tables: Sortable, filterable, and paginated
Interactive Charts: Line, bar, pie, and area charts
Form Components: Validated forms with real-time feedback
Notification System: Toast and push notifications
Command Palette: Quick navigation with Cmd+K
Theme Switcher: Light, dark, and system themes

🛠️ Tech Stack
Core Technologies

Framework: Next.js 14 (App Router)
Language: TypeScript (v5.0+)
UI Library: shadcn/ui
Styling: Tailwind CSS (v3.4+)
CSS Features: CSS Variables for theming

State & Data Management

Client State: Zustand
Server State: TanStack Query (React Query v5)
Forms: React Hook Form + Zod
Tables: TanStack Table

Additional Libraries

Charts: Recharts with shadcn/ui Chart
Animations: Framer Motion
Date Handling: date-fns
Icons: Lucide React
Class Names: clsx + tailwind-merge

📁 Project Structure
telegram-booking-dashboard/
├── app/                        # Next.js app directory
│   ├── (auth)/                # Auth group routes
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/           # Dashboard group routes
│   │   ├── layout.tsx         # Dashboard layout with sidebar
│   │   ├── page.tsx          # Overview page
│   │   ├── bookings/
│   │   ├── customers/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/                   # API routes
│   │   ├── bookings/
│   │   ├── webhooks/
│   │   └── auth/
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/                # React components
│   ├── ui/                   # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── stats-cards.tsx
│   │   ├── booking-table.tsx
│   │   ├── charts/
│   │   └── ...
│   ├── forms/                # Form components
│   │   ├── booking-form.tsx
│   │   └── ...
│   └── layouts/              # Layout components
│       ├── sidebar.tsx
│       └── header.tsx
├── lib/                      # Utility functions
│   ├── utils.ts             # Helper functions
│   ├── api-client.ts        # API client
│   ├── validations/         # Zod schemas
│   └── hooks/               # Custom React hooks
├── store/                    # Zustand stores
│   ├── use-booking-store.ts
│   └── use-ui-store.ts
├── styles/                   # Additional styles
├── types/                    # TypeScript types
│   ├── index.ts
│   └── api.ts
└── public/                   # Static assets
🚀 Getting Started
Prerequisites

Node.js 18+ and npm/yarn/pnpm
Git
Basic knowledge of React and TypeScript