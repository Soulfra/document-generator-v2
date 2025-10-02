# Contributing to Document Generator V2

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. **Fork and clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/document-generator-v2.git
cd document-generator-v2
```

2. **Install dependencies:**
```bash
make setup
```

3. **Start development environment:**
```bash
make dev
```

## Project Structure

Please familiarize yourself with our [Architecture Guide](./docs/architecture.md) before contributing.

```
document-generator-v2/
├── apps/          # User-facing applications
├── packages/      # Shared libraries
├── services/      # Microservices
├── infrastructure/ # DevOps configs
└── docs/          # Documentation
```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow our coding standards (see below)
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes
```bash
# Run all tests
make test

# Run linting
make lint

# Test specific package
cd packages/core && npm test
```

### 4. Commit Your Changes
We use [Conventional Commits](https://conventionalcommits.org/):

```bash
git commit -m "feat: add document validation feature"
git commit -m "fix: resolve authentication issue"
git commit -m "docs: update API documentation"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with:
- Clear description of changes
- Reference to any related issues
- Screenshots if UI changes
- Test results

## Coding Standards

### JavaScript/TypeScript
- Use TypeScript for new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write descriptive variable names
- Add JSDoc comments for functions

**Example:**
```typescript
/**
 * Generates a document from the given template and content
 * @param template - The template ID to use
 * @param content - The content to process
 * @returns Promise resolving to generated document
 */
export async function generateDocument(
  template: string,
  content: string
): Promise<Document> {
  // Implementation
}
```

### React Components
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Use descriptive component names
- Add proper error boundaries

**Example:**
```tsx
interface DocumentPreviewProps {
  document: Document;
  onEdit: (id: string) => void;
}

export function DocumentPreview({ document, onEdit }: DocumentPreviewProps) {
  return (
    <div className="document-preview">
      {/* Component implementation */}
    </div>
  );
}
```

### API Design
- Use RESTful conventions
- Implement proper error handling
- Add input validation
- Document with OpenAPI specs

### Testing
- Write unit tests for utilities
- Add integration tests for APIs
- Include E2E tests for critical flows
- Aim for >80% code coverage

## Pull Request Guidelines

### Before Submitting
- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Commits follow conventional format

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Screenshots (if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Issue Guidelines

### Bug Reports
Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Error messages/logs

### Feature Requests
Include:
- Problem description
- Proposed solution
- Alternative solutions
- Use cases

## Documentation

### When to Update Docs
- New features or APIs
- Changed behavior
- Configuration changes
- Setup instructions

### Documentation Standards
- Use clear, concise language
- Include code examples
- Add screenshots for UI
- Keep README up to date

## Community Guidelines

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Assume positive intent

### Getting Help
- Check existing issues first
- Use clear, descriptive titles
- Provide minimal reproduction cases
- Be patient with responses

## Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Schedule
- Patch releases: As needed
- Minor releases: Monthly
- Major releases: Quarterly

## Useful Commands

```bash
# Development
make dev          # Start development
make test         # Run all tests
make lint         # Run linters
make build        # Build everything

# Package-specific
make core         # Work on core package
make web          # Start web app
make api          # Start API server

# Utilities
make clean        # Clean everything
make status       # Check project status
make help         # Show all commands
```

## Getting Started Ideas

Looking for ways to contribute? Try these:

### Good First Issues
- Fix typos in documentation
- Add missing tests
- Improve error messages
- Update dependencies

### Intermediate Tasks
- Add new API endpoints
- Create UI components
- Implement validation
- Add monitoring

### Advanced Projects
- Performance optimization
- Security improvements
- Architecture changes
- New integrations

## Questions?

- Check our [docs](./docs/)
- Search existing issues
- Ask in discussions
- Reach out to maintainers

Thank you for contributing! 🎉