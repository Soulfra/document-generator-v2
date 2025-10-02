#\!/bin/bash
# Create monorepo structure

mkdir -p apps/web apps/api apps/admin
mkdir -p packages/core packages/auth packages/database packages/ui
mkdir -p services/recipe-intel services/ai-processor services/template-engine
mkdir -p infrastructure/docker infrastructure/kubernetes infrastructure/terraform
mkdir -p docs

echo "✓ Monorepo structure created"
tree -d -L 2
EOF < /dev/null