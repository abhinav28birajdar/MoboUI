# Contributing to MOBOUI

Thank you for your interest in contributing to MOBOUI! We're excited to work with you. This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Testing](#testing)
- [Documentation](#documentation)
- [Component Guidelines](#component-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Questions & Support](#questions--support)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of different opinions and experiences
- Focus on constructive criticism
- Show respect to other contributors

### Unacceptable Behavior
- Harassment, discrimination, or intimidation
- Abusive language or derogatory comments
- Offensive remarks about identity or background
- Unwelcome advances or attention

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Git
- A GitHub account
- A Supabase account (for testing)

### Fork & Clone

```bash
# 1. Fork the repository on GitHub
# Visit: https://github.com/yourusername/moboui
# Click "Fork" button

# 2. Clone your fork
git clone https://github.com/yourusername/moboui.git
cd moboui

# 3. Add upstream remote
git remote add upstream https://github.com/original/moboui.git

# 4. Fetch latest changes
git fetch upstream
```

## Development Setup

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Fill in your Supabase credentials
# (See SUPABASE_SETUP.md for detailed instructions)
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Verify Setup

- Navigate to `/components` to see component library
- Go to `/playground` to test live editor
- Visit `/register` and create a test account
- Test a feature or component

## Making Changes

### 1. Create Feature Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
# or for bugs:
git checkout -b fix/bug-description
```

### Branch Naming Convention

```
feature/add-new-button-component    # New feature
fix/auth-token-refresh              # Bug fix
docs/update-readme                  # Documentation
style/format-code                   # Code style
refactor/optimize-image-loading     # Refactoring
test/add-unit-tests                 # Tests
```

### 2. Make Your Changes

```bash
# Make changes to files
# Test locally
npm run dev

# Check for errors
npm run type-check
npm run lint

# Format code
npm run format
```

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add new component feature"
```

## Coding Standards

### TypeScript
- ✅ Always use TypeScript
- ✅ Define proper types for all functions
- ✅ Use interfaces for object shapes
- ✅ Avoid `any` type

```typescript
// Good
interface Props {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: (e: React.MouseEvent) => void;
}

// Avoid
function MyComponent(props: any) { ... }
```

### React Components
- ✅ Use functional components with hooks
- ✅ Extract complex logic to custom hooks
- ✅ Use `React.memo` for expensive renders
- ✅ Properly type component props

```typescript
// Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => (
    <button ref={ref} data-variant={variant} {...props} />
  )
);

Button.displayName = 'Button';
export default Button;
```

### Styling
- ✅ Use Tailwind CSS classes
- ✅ Follow existing design system
- ✅ Use Tailwind's `@apply` for reusable patterns
- ✅ Avoid inline styles

```typescript
// Good
<button className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600">
  Click me
</button>

// Avoid
<button style={{ padding: '8px 16px', backgroundColor: '#FFCA03' }}>
  Click me
</button>
```

### File Organization
- ✅ Keep files under 300 lines
- ✅ One component per file
- ✅ Organize by feature, not file type
- ✅ Use index.ts for barrel exports

```
src/components/Button/
├── Button.tsx        # Main component
├── Button.types.ts   # TypeScript types
├── Button.stories.tsx # Storybook stories
├── Button.test.tsx   # Tests
└── index.ts          # Barrel export
```

## Commit Messages

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting, missing semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Build, dependencies, tooling
- `perf:` - Performance improvement

### Examples

```bash
# New component
git commit -m "feat(components): add new input field component"

# Bug fix
git commit -m "fix(auth): resolve token refresh issue"

# Documentation update
git commit -m "docs(readme): update setup instructions"

# Multiple lines
git commit -m "feat(playground): add code export functionality

- Export TypeScript code
- Export JavaScript code
- Export Dart code for Flutter"
```

## Pull Requests

### Before Submitting

- ✅ Update your branch with latest upstream changes
- ✅ Run type check: `npm run type-check`
- ✅ Run linter: `npm run lint`
- ✅ Format code: `npm run format`
- ✅ Test your changes locally
- ✅ Add/update tests
- ✅ Update documentation if needed

### Submission Process

```bash
# 1. Push to your fork
git push origin feature/your-feature-name

# 2. Open Pull Request on GitHub
# - Go to https://github.com/yourusername/moboui
# - Click "New Pull Request"
# - Select main branch as target
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Related Issues
Closes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] No breaking changes

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No console errors or warnings
```

### Review Process

1. **Code Review** - Team reviews your code
2. **Feedback** - Address any requested changes
3. **Approval** - PR is approved by maintainers
4. **Merge** - Changes are merged to main

### Tips for Getting Approved
- Keep PR size reasonable (< 400 lines)
- Explain your reasoning in comments
- Respond quickly to feedback
- Ask questions if unclear
- Be open to suggestions

## Testing

### Run Tests

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Tests

```typescript
// Good: Clear test names
describe('Button Component', () => {
  it('should render with primary variant by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveClass('primary');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Documentation

### Update Documentation When
- Adding new components or features
- Changing API or props
- Adding new pages or routes
- Modifying database schema
- Implementing new functionality

### Documentation Files
- [README.md](./README.md) - Main documentation
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Backend setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [docs/](./content/docs/) - MDX documentation
- Inline code comments for complex logic

## Component Guidelines

### Creating New Components

1. **Plan** - Design API and props
2. **Implement** - Create component with tests
3. **Document** - Add Storybook stories and docs
4. **Review** - Submit PR for feedback

### Component Checklist

- [ ] Accepts standard HTML attributes (forwarded)
- [ ] Uses `React.forwardRef` if needed
- [ ] Properly typed with TypeScript
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Responsive design
- [ ] Dark/light mode support
- [ ] Tested with jest/testing-library
- [ ] Documented with Storybook
- [ ] Example code provided

### Component Template

```typescript
import React from 'react';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = 'primary', size = 'md', disabled = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`component component--${variant} component--${size}`}
        aria-disabled={disabled}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';

export default MyComponent;
```

## Reporting Bugs

### Before Reporting

- Check [existing issues](https://github.com/yourusername/moboui/issues)
- Try to reproduce on latest version
- Test in different browsers

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to page X
2. Click button Y
3. Observe Z

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Node version: 18.x
- Package manager: npm/pnpm

## Screenshots/Logs
[Attach screenshots or error logs]

## Possible Cause
[If you have any ideas]
```

## Feature Requests

### Request Template

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why you need this feature

## Example
How it would be used

## Alternatives
Other solutions you've considered
```

## Questions & Support

### Get Help
- 📧 **Email**: support@moboui.com
- 💬 **GitHub Discussions**: [Open a discussion](https://github.com/yourusername/moboui/discussions)
- 🐛 **Issues**: [Report a bug](https://github.com/yourusername/moboui/issues)
- 📖 **Documentation**: [Read the docs](https://moboui.com/docs)
- 🎮 **Discord**: [Join our community](https://discord.gg/moboui)

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

## Recognition

Contributors are recognized in:
- [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- [GitHub Contributors](https://github.com/yourusername/moboui/contributors)
- Project website

Thank you for contributing to MOBOUI! 🎉

---

**Last Updated**: May 2026
