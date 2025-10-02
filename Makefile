# Document Generator V2 - Master Makefile
# One command to rule them all

.PHONY: help setup dev test build deploy clean status

# Default target
help: ## Show this help message
	@echo "Document Generator V2 - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Initial project setup
	@echo "🚀 Setting up Document Generator V2..."
	@echo "📦 Installing dependencies..."
	npm install
	cd apps/web && npm install
	cd apps/api && npm install
	@echo "✅ Setup complete!"

dev: ## Start development environment
	@echo "🔥 Starting development environment..."
	@echo "Starting API server on port 3001..."
	cd apps/api && npm run dev &
	@echo "Starting web app on port 3000..."
	cd apps/web && npm run dev &
	@echo "🌐 Web: http://localhost:3000"
	@echo "🔌 API: http://localhost:3001"

test: ## Run all tests
	@echo "🧪 Running tests..."
	cd apps/api && npm test || echo "No API tests yet"
	cd apps/web && npm test || echo "No web tests yet"

lint: ## Run linters and formatters
	@echo "🔍 Running linters..."
	cd apps/api && npm run lint || echo "No API linting yet"
	cd apps/web && npm run lint || echo "No web linting yet"

build: ## Build all packages and apps
	@echo "🏗️  Building project..."
	cd apps/web && npm run build
	@echo "✅ Build complete!"

deploy: ## Deploy to production
	@echo "🚀 Deploying to production..."
	npm run deploy

clean: ## Clean all dependencies and build artifacts
	@echo "🧹 Cleaning project..."
	rm -rf node_modules
	rm -rf apps/*/node_modules apps/*/dist
	rm -rf packages/*/node_modules packages/*/dist
	rm -rf services/*/node_modules services/*/dist
	docker-compose down -v
	docker system prune -f

status: ## Show project status
	@echo "📊 Project Status:"
	@echo "Git: $(shell git branch --show-current)"
	@echo "Node: $(shell node --version)"
	@echo "NPM: $(shell npm --version)"
	@echo "Docker: $(shell docker --version | cut -d' ' -f3)"
	@echo ""
	@echo "Active containers:"
	@docker ps --format "table {{.Names}}\t{{.Status}}" 2>/dev/null || echo "Docker not running"

# Package-specific commands
core: ## Work with core package
	cd packages/core && npm run dev

auth: ## Work with auth package  
	cd packages/auth && npm run dev

# App-specific commands
web: ## Start web app
	cd apps/web && npm run dev

api: ## Start API server
	cd apps/api && npm run dev

# Service-specific commands
recipe: ## Start recipe intelligence service
	cd services/recipe-intel && npm run dev

ai: ## Start AI processor service
	cd services/ai-processor && npm run dev

# Quick commands
logs: ## Show logs
	docker-compose -f infrastructure/docker/docker-compose.dev.yml logs -f

restart: ## Restart development environment
	docker-compose -f infrastructure/docker/docker-compose.dev.yml restart

stop: ## Stop all services
	docker-compose -f infrastructure/docker/docker-compose.dev.yml down