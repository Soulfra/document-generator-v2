# Development Guide

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Soulfra/document-generator-v2.git
cd document-generator-v2

# Install dependencies
make setup

# Start development environment
make dev
```

## Prerequisites

- Node.js 18+ 
- npm 8+
- Docker (optional, for full environment)

## Project Structure

```
document-generator-v2/
├── apps/                    # Applications
│   ├── web/                # React frontend
│   ├── api/                # Express API
│   └── admin/              # Admin dashboard
├── packages/               # Shared packages
│   ├── core/              # Document processing
│   ├── auth/              # Authentication
│   ├── database/          # Database utilities
│   └── ui/                # UI components
├── services/              # Microservices
├── infrastructure/        # Deployment configs
└── docs/                  # Documentation
```

## Development Commands

| Command | Description |
|---------|-------------|
| `make setup` | Initial project setup |
| `make dev` | Start development servers |
| `make test` | Run all tests |
| `make lint` | Run linters |
| `make build` | Build all packages |
| `make clean` | Clean all artifacts |

## Working with Packages

### Core Package
```bash
cd packages/core
npm run dev
```

### Web App
```bash  
cd apps/web
npm run dev
```

### API Server
```bash
cd apps/api  
npm run dev
```

## Environment Setup

1. Copy environment file:
```bash
cp .env.example .env
```

2. Update variables as needed

3. Start development:
```bash
make dev
```

## Testing

```bash
# Run all tests
make test

# Run tests for specific package
cd packages/core && npm test

# Run tests with coverage
npm run test:coverage
```

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Stop all services
make stop

# Check what's using port
lsof -i :3000
```

**Dependencies out of sync:**
```bash
# Clean and reinstall
make clean
make setup
```

**Docker issues:**
```bash
# Reset Docker environment
docker-compose down -v
docker system prune -f
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `make test`
5. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.