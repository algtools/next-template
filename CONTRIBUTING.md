# Contributing to Next.js Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
   cd REPO_NAME
   ```
3. **Install dependencies:**
   ```bash
   pnpm install
   ```
4. **Set up git hooks:**
   ```bash
   pnpm run prepare
   ```

## 🔄 Development Workflow

### 1. Create a Feature Branch

Always branch from `dev`:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/your-feature-name
```

### 2. Make Your Changes

Follow these guidelines:
- Write clear, concise code
- Add tests for new features
- Update documentation as needed
- Follow existing code style
- Keep commits atomic and focused

### 3. Commit Your Changes

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat(scope): add new feature"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

**Important:**
- Maximum 100 characters per line
- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")

### 4. Run Pre-commit Checks

Before pushing, ensure all checks pass:

```bash
pnpm run lint
pnpm run format:check
pnpm run type-check
pnpm run test
pnpm run build
```

**Note:** Git hooks will automatically run these checks on commit!

### 5. Push and Create Pull Request

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request to the `dev` branch.

## ✅ Pull Request Guidelines

### PR Requirements

- [ ] **Title:** Use conventional commit format
- [ ] **Description:** Clear description of changes
- [ ] **Tests:** All tests pass
- [ ] **Lint:** No linting errors
- [ ] **Format:** Code is properly formatted
- [ ] **Type Check:** No TypeScript errors
- [ ] **Build:** Application builds successfully
- [ ] **Documentation:** Updated if necessary

### PR Review Process

1. **Automated Checks:** GitHub Actions will run all checks
2. **Chromatic Review:** For PRs to `dev`, visual changes must be approved
3. **Code Review:** Maintainers will review your code
4. **Deployment Preview:** Preview URL will be posted in PR comments
5. **Approval:** Once approved, your PR can be merged

## 🧪 Testing Guidelines

### Unit Tests

- Write tests for all new features
- Use descriptive test names
- Test edge cases
- Aim for >70% code coverage

```typescript
// Example test
describe('Button', () => {
	it('should render with correct text', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});
});
```

### Component Tests

- Test component behavior, not implementation
- Use user-centric queries (`getByRole`, `getByLabelText`)
- Test accessibility

### Storybook Stories

- Create stories for all UI components
- Document component props
- Show different states and variants

```typescript
// Example story
export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Button',
	},
};
```

## 🎨 Code Style

### TypeScript

- Use strict TypeScript mode
- Avoid `any` types
- Use interfaces for object shapes
- Export types alongside components

### React

- Prefer functional components
- Use TypeScript for props
- Follow hooks rules
- Use Server Components by default

### Styling

- Use Tailwind CSS classes
- Follow mobile-first approach
- Use consistent spacing scale
- Keep styles co-located with components

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Tests: `*.test.ts` or `*.spec.ts`
- Stories: `*.stories.tsx`

## 📝 Documentation

### Code Comments

- Document complex logic
- Explain "why", not "what"
- Use JSDoc for public APIs

```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.1 for 10%)
 * @returns Total price with tax applied
 */
function calculateTotal(price: number, taxRate: number): number {
	return price * (1 + taxRate);
}
```

### README Updates

- Update README.md for significant changes
- Add examples for new features
- Update setup instructions if needed

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Verify it's not a configuration issue
3. Try reproducing in a clean environment
4. Check if it's already fixed in `dev`

### Bug Report Format

```markdown
**Description**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS]
- Node version: [e.g., 20.10.0]
- pnpm version: [e.g., 9.0.0]
```

## 🚀 Feature Requests

### Feature Request Format

```markdown
**Problem**
Describe the problem this feature solves

**Proposed Solution**
Your proposed solution

**Alternatives**
Alternative solutions you've considered

**Additional Context**
Any other context or screenshots
```

## 🔒 Security

If you discover a security vulnerability:

1. **Do NOT open a public issue**
2. Email the maintainers directly
3. Include detailed information
4. Wait for a response before disclosing

## 📜 License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## 💬 Questions?

- Open a Discussion on GitHub
- Check existing documentation
- Review closed issues/PRs

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🎉**
