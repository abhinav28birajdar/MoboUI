# MOBOUI - Enterprise Mobile UI Component Library

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.1+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A **production-grade**, fully-featured mobile UI component library for **Flutter**, **React Native**, and **Expo**. Build beautiful, responsive, and accessible mobile applications with professionally designed components and a comprehensive design system.

**Enterprise Features**: Full Supabase integration, user authentication, data persistence, file storage, real-time device emulation, and a powerful live playground.

[Live Demo](https://moboui.com) • [Documentation](https://moboui.com/docs) • [Component Library](https://moboui.com/components) • [Playground](https://moboui.com/playground)

</div>

---

## ✨ Key Features

### 📱 Component Library
- **50+ Professional Components** - Buttons, Cards, Forms, Navigation, Modals, and more
- **Framework Support** - Flutter, React Native, Expo, and Web components
- **Responsive Design** - Mobile-first approach with full responsiveness
- **Accessibility** - WCAG 2.1 AA compliant components
- **Dark/Light Mode** - Built-in theme switching with persistence

### 🎨 Design System
- **Golden Design Language** - Premium golden accent color (#FFCA03) with sophisticated color palette
- **Consistent Styling** - Unified design patterns across all components
- **TypeScript Support** - Fully typed components and utilities
- **Theme Customization** - Easy-to-use theming system with CSS variables

### 🛠 Developer Experience
- **Live Playground** - Real-time code editor with Monaco Editor integration
- **Device Emulator** - Preview components on iPhone and Android simulators
- **Component Preview** - Interactive component demonstrations
- **Code Examples** - Copy-paste ready code snippets for each component
- **Hot Reload** - Instant feedback during development

### 🔐 Backend & Authentication
- **User Authentication** - Email/password, GitHub, and Google OAuth via Supabase
- **Data Persistence** - PostgreSQL database with real-time capabilities
- **File Storage** - Cloud storage for uploads and media management
- **User Profiles** - Customizable user accounts and preferences
- **Session Management** - Secure token-based authentication

### ⭐ Additional Features
- **Favorites System** - Save and manage favorite components
- **Project Submissions** - Submit and showcase your projects
- **Community** - Connect with other developers
- **Marketplace** - Browse and discover community components
- **Blog** - Latest updates and best practices
- **Analytics** - Track component usage and performance

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 15.1+** | React framework with App Router and Server Components |
| **React 19** | UI library with latest features and improvements |
| **TypeScript 5.3+** | Type-safe JavaScript for better development experience |
| **Tailwind CSS 3.4+** | Utility-first CSS framework for rapid UI development |
| **Tailwind UI** | Premium component library built on Tailwind |
| **Radix UI** | Headless component library for accessible UI primitives |

### Animations & Interactions
| Technology | Purpose |
|-----------|---------|
| **Framer Motion** | Advanced animation library for React |
| **Tailwind Animate** | CSS animations and transitions |
| **Embla Carousel** | Carousel/slider component library |

### Code Editing & Highlighting
| Technology | Purpose |
|-----------|---------|
| **Monaco Editor** | Powerful code editor from VS Code |
| **Shiki** | Syntax highlighting with VS Code themes |
| **React Syntax Highlighter** | Alternative syntax highlighting component |

### Backend & Services
| Technology | Purpose |
|-----------|---------|
| **Supabase** | PostgreSQL database with built-in auth |
| **PostgreSQL** | Relational database for data persistence |
| **Supabase Auth** | Email, password, and OAuth authentication |
| **Supabase Storage** | Cloud file storage and CDN |

### Icons & Utilities
| Technology | Purpose |
|-----------|---------|
| **Lucide React** | Beautiful, consistent icon library |
| **React Hook Form** | Performant form state management |
| **Zod** | TypeScript-first schema validation |
| **Zustand** | Lightweight state management |
| **Date-fns** | Modern date utility library |
| **React Hot Toast** | Toast notification system |

### Development Tools
| Technology | Purpose |
|-----------|---------|
| **ESLint** | Code quality and linting |
| **Prettier** | Code formatting |
| **pnpm** | Fast package manager (optional) |

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd moboui
npm install
```

### 2. Setup Supabase

**See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.**

Quick steps:
1. Create a Supabase project at https://supabase.com
2. Execute the SQL schema from `supabase-schema.sql` in Supabase SQL Editor
3. Copy your credentials to `.env.local`

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Test Features

```bash
# Test authentication
- Go to /register to create an account
- Go to /login to sign in

# Test features
- Visit /components to browse the component library
- Go to /playground to test the live editor
- Visit /account to view your profile
- Go to /submit to submit a project

# Test admin features (requires admin role)
- Visit /admin/upload to upload components
- Access /admin to view dashboard
```

## 📁 Project Structure

```
moboui/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication routes
│   │   │   ├── login/                # Login page
│   │   │   └── register/             # Registration page
│   │   ├── api/                      # API routes
│   │   │   ├── auth/                 # Auth endpoints
│   │   │   ├── components/           # Components CRUD API
│   │   │   ├── favorites/            # Favorites endpoints
│   │   │   ├── submissions/          # Submissions endpoints
│   │   │   ├── search/               # Search API
│   │   │   ├── ai/                   # AI endpoints
│   │   │   └── trpc/                 # tRPC API
│   │   ├── account/                  # User account page
│   │   ├── admin/                    # Admin dashboard
│   │   ├── ai/                       # AI tools (converter, generator)
│   │   ├── blog/                     # Blog posts
│   │   ├── changelog/                # Changelog page
│   │   ├── community/                # Community page
│   │   ├── components/               # Component showcase
│   │   ├── docs/                     # Documentation
│   │   ├── marketplace/              # Marketplace
│   │   ├── playground/               # Live playground
│   │   ├── search/                   # Search page
│   │   ├── showcase/                 # Project showcase
│   │   ├── submit/                   # Project submission
│   │   ├── templates/                # Templates page
│   │   ├── themes/                   # Themes page
│   │   └── layout.tsx                # Root layout
│   ├── components/                   # React components
│   │   ├── ui/                       # Shadcn/UI components
│   │   ├── layout/                   # Layout components (Header, Footer, Nav)
│   │   ├── shared/                   # Shared components
│   │   ├── home/                     # Home page components
│   │   ├── editor/                   # Code editor components
│   │   ├── emulator/                 # Device emulator
│   │   ├── playground/               # Playground components
│   │   ├── docs/                     # Documentation components
│   │   ├── component-library/        # Component library display
│   │   ├── component-detail/         # Component details
│   │   └── animations/               # Animation components
│   ├── lib/
│   │   ├── auth/                     # Auth utilities and hooks
│   │   ├── supabase/                 # Supabase client configuration
│   │   ├── context/                  # React context providers
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── store/                    # Zustand state management
│   │   ├── data/                     # Component data and seed files
│   │   ├── types/                    # TypeScript type definitions
│   │   ├── utils/                    # Utility functions
│   │   ├── constants/                # Constants and config
│   │   ├── playground/               # Playground utilities
│   │   └── animations.ts             # Animation definitions
│   ├── server/                       # Server-side utilities
│   │   ├── auth/                     # Server auth utilities
│   │   ├── db/                       # Database queries
│   │   └── trpc/                     # tRPC server setup
│   ├── styles/                       # Global styles
│   │   └── globals.css               # Global Tailwind styles
│   └── hooks/                        # Root-level custom hooks
├── public/                           # Static assets
│   ├── assets/                       # Images and media
│   ├── components/                   # Component screenshots
│   ├── devices/                      # Device emulator images
│   └── logos/                        # Brand logos
├── content/                          # Content files
│   └── docs/                         # Documentation MDX files
├── prisma/                           # Database schema
│   └── schema.prisma                 # Prisma schema
├── supabase/                         # Supabase configuration
│   └── schema.sql                    # Database schema
├── Configuration Files
│   ├── next.config.ts                # Next.js configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── postcss.config.mjs            # PostCSS configuration
│   ├── package.json                  # Dependencies and scripts
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   └── .prettierrc                   # Code formatting rules
├── Documentation
│   ├── README.md                     # This file
│   ├── SUPABASE_SETUP.md             # Supabase setup guide
│   ├── DEPLOYMENT.md                 # Production deployment guide
│   ├── CONTRIBUTING.md               # Contributing guidelines
│   └── supabase-schema.sql           # Complete database schema
```

## 🎯 Core Concepts

### Authentication System
The app uses Supabase Authentication for secure user management:
- **Email/Password** - Traditional authentication
- **OAuth 2.0** - GitHub and Google integration
- **Session Management** - Automatic token refresh
- **RLS Policies** - Database-level access control

### Component System
Components are organized by:
- **Framework** - Flutter, React Native, Expo, Web
- **Category** - Navigation, Forms, Cards, etc.
- **Complexity** - Basic, Intermediate, Advanced
- **Status** - Official, Community, Experimental

### State Management
- **Zustand** - Client-side application state
- **Supabase Context** - Authentication state
- **React Query** - Server state management (if using)
- **Local Storage** - Persistent user preferences

## 📊 Database Schema Overview

```sql
-- User Management
profiles (id, email, full_name, avatar_url, role, ...)

-- Components
components (id, name, description, code, framework, ...)
categories (id, name, description, ...)
component_categories (component_id, category_id)

-- User Interactions
favorites (id, user_id, component_id)
submissions (id, user_id, title, description, code, ...)

-- Content
themes (id, name, colors, ...)
templates (id, name, code, description, ...)
activity_logs (id, user_id, action, timestamp, ...)
```

See [supabase-schema.sql](./supabase-schema.sql) for complete schema.

## 🚀 Deployment

### Prerequisites
- Supabase account with active project
- Node.js 18+ installed locally
- Vercel account (recommended) or similar hosting

### Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
```

### Deploying to Other Platforms

**Netlify, AWS Amplify, Railway, etc.**

Ensure environment variables are set:
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-role-key
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides.

## 🔒 Security Best Practices

- ✅ Never commit `.env.local` or sensitive keys
- ✅ Use environment variables for all secrets
- ✅ Enable Row Level Security (RLS) in Supabase
- ✅ Validate all user inputs on server and client
- ✅ Use HTTPS in production
- ✅ Implement rate limiting on API endpoints
- ✅ Regular security audits and updates
- ✅ Monitor activity logs for suspicious behavior

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```
Solution: Verify .env.local credentials and Supabase project status
```

**Authentication Fails**
```
Solution: Check email is verified and OAuth URLs are configured
```

**Upload Fails**
```
Solution: Verify storage bucket exists, is public, and has correct policies
```

**Components Not Loading**
```
Solution: Check browser console for errors, verify database has data
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for comprehensive troubleshooting.

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Project overview (this file) |
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Supabase configuration guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment guide |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines |
| [supabase-schema.sql](./supabase-schema.sql) | Database schema |

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

```bash
# Fork the repository
# Clone your fork
git clone https://github.com/yourusername/moboui.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m 'Add amazing feature'

# Push to your fork
git push origin feature/amazing-feature

# Open Pull Request on GitHub
```

## 🎨 Design System

### Color Palette
- **Primary Accent**: `#FFCA03` - Professional Gold
- **Dark Background**: `#0A0A0A` - Deep Black
- **Light Background**: `#FFFFFF` - Pure White
- **Text Primary**: `#1A1A1A` (dark mode: `#FFFFFF`)
- **Text Secondary**: `#666666` (dark mode: `#CCCCCC`)

### Design Principles
- Minimalist and clean aesthetic
- No gradients or excessive shadows
- Consistent spacing (4px/8px grid)
- Semantic color usage
- Accessibility first (WCAG 2.1 AA)
- Mobile-first responsive design

## 📊 Performance

- **Lighthouse Score**: Target 95+ for Performance, Accessibility, Best Practices
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Optimized with Next.js code splitting
- **Image Optimization**: Using Next.js Image component
- **Caching Strategy**: Aggressive caching for static assets

## 🔄 Version History

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

### License Terms
- ✅ Commercial use allowed
- ✅ Private use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ❌ Liability not included
- ❌ Warranty not included

## 🔗 Resources & Links

| Resource | Link |
|----------|------|
| Supabase | https://supabase.com |
| Next.js | https://nextjs.org |
| React | https://react.dev |
| TypeScript | https://www.typescriptlang.org |
| Tailwind CSS | https://tailwindcss.com |
| Radix UI | https://www.radix-ui.com |
| Shadcn/UI | https://ui.shadcn.com |
| Framer Motion | https://www.framer.com/motion |
| Zustand | https://github.com/pmndrs/zustand |

## 💬 Support & Community

- 📧 **Email**: support@moboui.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/moboui/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/moboui/discussions)
- 📱 **Twitter**: [@moboui](https://twitter.com/moboui)
- 🎮 **Discord**: [Join Community](https://discord.gg/moboui)

## 👥 Team

MOBOUI is maintained by a dedicated team of developers passionate about creating beautiful, accessible mobile UI components.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for backend infrastructure
- [Vercel](https://vercel.com) for hosting
- [shadcn/ui](https://ui.shadcn.com) for component patterns
- [Radix UI](https://www.radix-ui.com) for accessible primitives
- All contributors and users of MOBOUI

---

<div align="center">

**Made with ❤️ by the MOBOUI Team**

[Star us on GitHub](https://github.com/yourusername/moboui) • [Follow on Twitter](https://twitter.com/moboui) • [Join Discord](https://discord.gg/moboui)

</div>
