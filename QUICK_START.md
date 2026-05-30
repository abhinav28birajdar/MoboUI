# MOBOUI Developer Quick Start Guide

Quick reference guide for developers working with MOBOUI.

## 🚀 Getting Started (5 minutes)

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/moboui.git
cd moboui
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Fill in your Supabase credentials
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 📖 Essential Documentation

| Task | Document |
|------|----------|
| Setup Database | [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) |
| Deploy to Production | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Contributing Code | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| Project Overview | [README.md](./README.md) |
| Version History | [CHANGELOG.md](./CHANGELOG.md) |

---

## 🛠 Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
```

### Code Quality
```bash
npm run type-check   # Check TypeScript
npm run lint         # Run ESLint
npm run format       # Format with Prettier
```

### Testing
```bash
npm run test         # Run tests
npm run test:watch   # Watch mode
```

---

## 📁 Project Structure Quick Reference

```
moboui/
├── src/
│   ├── app/          # Next.js pages & routes
│   ├── components/   # React components
│   ├── lib/          # Utilities & helpers
│   └── styles/       # Global styles
├── supabase/         # Database setup
├── public/           # Static assets
└── [config files]    # Tailwind, TypeScript, etc.
```

---

## 🔑 Key Technologies

| Purpose | Technology |
|---------|-----------|
| Framework | Next.js 15+ |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Library | Radix UI, shadcn/ui |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| State | Zustand |
| Forms | React Hook Form + Zod |

---

## 🔐 Environment Variables

**Required for local development:**
```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
SUPABASE_SERVICE_ROLE_KEY=your-secret-key
```

See `.env.example` for all options.

---

## 💡 Development Tips

### Component Creation
```typescript
// src/components/MyComponent/MyComponent.tsx
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
}

const MyComponent = React.forwardRef<HTMLDivElement, Props>(
  ({ variant = 'primary', ...props }, ref) => (
    <div ref={ref} data-variant={variant} {...props} />
  )
);

MyComponent.displayName = 'MyComponent';
export default MyComponent;
```

### Using TypeScript
- Always type function parameters and returns
- Use interfaces for object shapes
- Avoid `any` type (ESLint will catch it)

### Styling with Tailwind
```typescript
// Use Tailwind classes
<button className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600">
  Click me
</button>
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Database Connection Error
```bash
# Verify .env.local has correct credentials
# Check Supabase project is active
# Clear cache: rm -rf .next
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| Development | http://localhost:3000 |
| Supabase | https://supabase.com/dashboard |
| Documentation | https://moboui.com/docs |
| GitHub | https://github.com/yourusername/moboui |

---

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

---

## 🤝 Getting Help

- **Quick Questions**: GitHub Discussions
- **Report Bug**: GitHub Issues
- **Feature Request**: GitHub Discussions
- **Documentation**: Check [README.md](./README.md)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Last Updated**: May 30, 2026
