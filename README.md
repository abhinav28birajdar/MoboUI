# MOBOUI — Enterprise Mobile UI Component Library

MOBOUI is an enterprise-grade, production-ready, database-backed UI catalog for mobile developers building beautiful and high-performance applications in **Flutter**, **React Native**, and **Expo**.

This repository is built using **Next.js 15.1**, **React 19**, **Tailwind CSS 4.0**, and integrates natively with **Supabase** for user authentication, profile synchronization, favorites, and community project submissions.

---

## 🚀 Key Features

* **30+ Premium Components**: Solid, outlined, animated, and glassmorphic designs for buttons, inputs, navigation drawers, card sheets, modals, and lists.
* **Dual-Framework Code Support**: Provides copy-paste ready code blocks in both **TypeScript (React Native/Expo)** and **Dart (Flutter)**.
* **Interactive Live Emulator**: Embedded DartPad and Expo Snack simulators let users edit component code blocks directly in the browser and preview changes in real-time.
* **Supabase Authentication**: Integrated Email/Password, GitHub, and Google OAuth sessions with role-based access controls (user, moderator, admin).
* **Community Project Submissions**: Secure submissions system allowing members to upload and showcase mobile apps built with MoboUI.
* **Favorites System**: Instantly save and sync bookmarked components directly to the user's account dashboard.
* **Centralized API Client**: Custom fetch handler featuring automated request retries, typed responses, error boundaries, and offline fallback mode.

---

## 💻 Tech Stack

* **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
* **Styles & Animations**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
* **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Supabase Auth, Storage)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand)
* **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) via `@monaco-editor/react`

---

## 📁 Folder Structure

The project follows a clean, modular architecture:

```text
src/
├── app/                  # Next.js App Router pages, APIs, and route configurations
│   ├── (auth)/           # Authentication views (login, register, reset password)
│   ├── admin/            # Secure administrator dashboard and upload catalog
│   ├── api/              # Standardized API routes (components, favorites, submissions)
│   └── components/       # Component library and details pages
├── components/           # Reusable React components grouped by module
│   ├── component-detail/ # Emulator view and code panels
│   ├── component-library/# Catalog grid cards and sidebars
│   ├── layout/           # Shared site structures (Navbar, Footer, Sidebar)
│   ├── shared/           # Cross-cutting UI utilities (AuthGuard, GlowEffect)
│   └── ui/               # Core design system inputs and buttons (shadcn-compatible)
├── hooks/                # Custom React hooks (useComponents, useDebounce)
├── lib/                  # Shared utilities and configurations
│   ├── api/              # Centralized apiClient wrapper with retry logic
│   ├── auth/             # Supabase auth-service
│   ├── data/             # Static mock components and documentation files
│   └── supabase/         # Supabase connection clients (client, server, storage)
```

---

## 🛠 Installation & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/abhinav28birajdar/MoboUI.git
cd MoboUI
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` into a new local configuration file:
```bash
cp .env.example .env.local
```
Edit `.env.local` and populate your Supabase connection parameters:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. Database Setup (Supabase)
MoboUI contains a single consolidated master SQL script representing the complete database schema.
1. Open the [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor** tab.
3. Paste the contents of [database/master.sql](file:///e:/programming/Next%20js%20App/moboui/database/master.sql).
4. Run the script to initialize tables, indexes, RLS constraints, auth triggers, and default categories.

### 4. Running the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application locally.

---

## 📦 Build Process

Validate types and compile the optimized production bundle before deploying:
```bash
# Run TypeScript compilation check
npm run type-check

# Build the Next.js distribution
npm run build
```

---

## 🔒 Security & Protection

* **Client Guarding**: Sensitive paths like the administrative overview (`/admin`) and the publishing console (`/admin/upload`) are wrapped with [AuthGuard](file:///e:/programming/Next%20js%20App/moboui/src/components/shared/AuthGuard.tsx) to ensure only authenticated users with role `admin` or `moderator` can access them.
* **Database Row Level Security (RLS)**: Users are restricted by standard PostgreSQL RLS rules. They can read all published components, but can only edit, favorite, or delete rows linked explicitly to their private user ID.
* **Supabase triggers**: A dedicated DB trigger automatically replicates user registrations from `auth.users` into the public `profiles` table to maintain data integrity.

---

## 💡 Troubleshooting & Fallback behavior

> [!TIP]
> **Graceful Fallback Mode (No-Database Mode)**
> If the Supabase keys are missing or invalid, MoboUI will print a warn sign to the console and transition automatically to **Offline Fallback Mode**. The catalog will read and filter mock components from [components.ts](file:///e:/programming/Next%20js%20App/moboui/src/lib/data/components.ts) completely client-side. This ensures that frontend design iterations never block on backend connectivity.