# Document Generator V2

> Modern, clean, organized monorepo for the Document Generator platform

This is the **V2 rewrite** of the Document Generator, extracted and organized from the original monolithic repository.

## 🏗️ Architecture

```
document-generator-v2/
├── apps/                    # Deployable applications
│   ├── web/                # React/Next.js frontend
│   ├── api/                # Express.js API gateway
│   └── admin/              # Admin dashboard
├── packages/               # Shared libraries
│   ├── core/              # Document processing core
│   ├── auth/              # Authentication utilities
│   ├── database/          # Database schemas & utilities
│   └── ui/                # Shared UI components
├── services/              # Microservices
│   ├── recipe-intel/      # Recipe intelligence service
│   ├── ai-processor/      # AI processing service
│   └── template-engine/   # Template processing
├── infrastructure/        # DevOps & deployment
│   ├── docker/           # Docker configurations
│   ├── kubernetes/       # K8s manifests
│   └── terraform/        # Infrastructure as code
└── docs/                 # Documentation
```

## 🚀 Quick Start

```bash
# Install dependencies
make setup

# Start development environment
make dev

# See all available commands
make help
```

## 📦 Packages

- **@soulfra/core** - Document processing engine
- **@soulfra/auth** - Authentication & authorization
- **@soulfra/database** - Database utilities & schemas
- **@soulfra/ui** - Shared React components

## 🔧 Development

This monorepo uses:
- **NPM Workspaces** for dependency management
- **Turbo** for build orchestration
- **Docker** for local development
- **Make** for command orchestration

### Common Commands

```bash
make dev      # Start everything
make test     # Run all tests
make build    # Build all packages
make clean    # Clean everything
make status   # Show project status
```

### Working on Specific Parts

```bash
make web      # Start just the web app
make api      # Start just the API
make core     # Work on core package
make recipe   # Start recipe service
```

## 🎯 Goals

- ✅ **Clean architecture** - Proper separation of concerns
- ✅ **Easy development** - One command to start everything
- ✅ **Scalable** - Add new services/packages easily
- ✅ **Organized** - Everything has its place
- ✅ **Fast** - Optimized for development speed

## 🔄 Migration from V1

This replaces the old `document-generator-mvp` repository which became too large and disorganized. The V2 architecture provides:

- Better code organization
- Faster development cycles
- Easier deployment
- Cleaner dependencies
- Professional structure

## 📚 Documentation

- [Development Guide](./docs/development.md)
- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Architecture Decisions](./docs/architecture.md)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## 📄 License

MIT © Soulfra