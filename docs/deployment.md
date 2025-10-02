# Deployment Guide

## Local Development

### Quick Start
```bash
# Clone and setup
git clone https://github.com/Soulfra/document-generator-v2.git
cd document-generator-v2
make setup

# Start development
make dev
```

### Manual Setup
```bash
# Install dependencies
npm install

# Start each service
cd apps/api && npm run dev &
cd apps/web && npm run dev &
```

## Docker Development

### Using Docker Compose
```bash
# Start all services
docker-compose -f infrastructure/docker/docker-compose.dev.yml up

# Services available at:
# - Web: http://localhost:3000
# - API: http://localhost:3001
# - Database: localhost:5432
```

### Individual Containers
```bash
# Build images
docker build -t soulfra/web apps/web
docker build -t soulfra/api apps/api

# Run containers
docker run -p 3000:3000 soulfra/web
docker run -p 3001:3001 soulfra/api
```

## Production Deployment

### Environment Variables

Create `.env.production`:
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
API_KEY=your-production-api-key
JWT_SECRET=your-jwt-secret
```

### Build for Production
```bash
# Build all packages
make build

# Or manually
npm run build
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Configure environment variables in Vercel dashboard

### Deploy to Railway

1. Connect GitHub repository to Railway
2. Set environment variables
3. Deploy automatically on push

### Deploy to AWS

#### Using ECS (Recommended)

1. Build and push Docker images:
```bash
# Build for production
docker build -t your-registry/soulfra-web apps/web
docker build -t your-registry/soulfra-api apps/api

# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin your-registry
docker push your-registry/soulfra-web
docker push your-registry/soulfra-api
```

2. Create ECS task definition
3. Deploy to ECS cluster

#### Using Lambda (Serverless)
```bash
# Install serverless
npm i -g serverless

# Deploy
cd infrastructure/serverless
serverless deploy
```

### Deploy to Kubernetes

```bash
# Apply manifests
kubectl apply -f infrastructure/kubernetes/

# Check deployment
kubectl get pods
kubectl get services
```

## Database Setup

### PostgreSQL
```sql
CREATE DATABASE document_generator;
CREATE USER soulfra WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE document_generator TO soulfra;
```

### Run Migrations
```bash
# Development
npm run migrate:dev

# Production  
npm run migrate:prod
```

## Monitoring

### Health Checks
- API: `GET /health`
- Web: `GET /api/health`
- Database: Connection check in `/health`

### Logging
- Development: Console logs
- Production: Structured JSON logs
- External: Datadog, New Relic, or CloudWatch

### Metrics
- Response times
- Error rates
- Database performance
- Memory/CPU usage

## SSL/Security

### Development
```bash
# Generate self-signed cert
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
```

### Production
- Use Let's Encrypt for free SSL
- Configure reverse proxy (nginx)
- Set security headers

## Backup & Recovery

### Database Backups
```bash
# Automated backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### File Storage
- Use AWS S3 for document storage
- Configure automatic backups
- Set lifecycle policies

## Performance Optimization

### Frontend
- Enable compression (gzip/brotli)
- Use CDN for static assets
- Implement caching strategies

### Backend
- Database indexing
- Redis caching
- Connection pooling
- Rate limiting

### Infrastructure
- Load balancing
- Auto-scaling
- Database read replicas
- Content delivery network

## Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Find process using port
lsof -i :3000
kill -9 <PID>
```

**Database connection:**
```bash
# Test connection
psql $DATABASE_URL

# Check logs
docker logs container-name
```

**Build failures:**
```bash
# Clear cache
npm run clean
rm -rf node_modules
npm install
```

## Security Checklist

- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] API rate limiting enabled
- [ ] HTTPS enforced
- [ ] Dependencies updated
- [ ] Security headers configured
- [ ] Backup strategy implemented
- [ ] Monitoring alerts configured