# API Documentation

## Overview

The Document Generator API provides endpoints for document processing, template management, and content generation.

## Base URL

```
http://localhost:3001/api/v1
```

## Authentication

Most endpoints require authentication via Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.example.com/v1/documents
```

## Core Endpoints

### Documents

#### Generate Document
```http
POST /api/v1/documents/generate
Content-Type: application/json

{
  "template": "business-plan",
  "content": "AI-powered document generator",
  "format": "pdf"
}
```

**Response:**
```json
{
  "id": "doc_abc123",
  "status": "completed",
  "downloadUrl": "/api/v1/documents/doc_abc123/download",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### List Documents
```http
GET /api/v1/documents
```

**Response:**
```json
{
  "documents": [
    {
      "id": "doc_abc123", 
      "title": "Business Plan",
      "status": "completed",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}
```

#### Download Document
```http
GET /api/v1/documents/{id}/download
```

### Templates

#### List Templates
```http
GET /api/v1/templates
```

**Response:**
```json
{
  "templates": [
    {
      "id": "business-plan",
      "name": "Business Plan",
      "description": "Comprehensive business plan template",
      "category": "business"
    }
  ]
}
```

#### Get Template
```http
GET /api/v1/templates/{id}
```

### Processing

#### Process Document
```http
POST /api/v1/process
Content-Type: multipart/form-data

file: [uploaded file]
options: {"format": "pdf", "template": "default"}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid template ID",
    "details": {
      "field": "template",
      "value": "invalid-template"
    }
  }
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing or invalid auth |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated users

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

## SDKs and Examples

### JavaScript/Node.js
```javascript
const { DocumentGenerator } = require('@soulfra/sdk');

const client = new DocumentGenerator({
  apiKey: 'your-api-key',
  baseUrl: 'http://localhost:3001'
});

const document = await client.generateDocument({
  template: 'business-plan',
  content: 'My startup idea...'
});
```

### Python
```python
from soulfra import DocumentGenerator

client = DocumentGenerator(api_key='your-api-key')

document = client.generate_document(
    template='business-plan',
    content='My startup idea...'
)
```

### cURL Examples

**Generate a document:**
```bash
curl -X POST http://localhost:3001/api/v1/documents/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "template": "business-plan",
    "content": "AI document generator startup",
    "format": "pdf"
  }'
```

**Upload and process a file:**
```bash
curl -X POST http://localhost:3001/api/v1/process \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@document.docx" \
  -F "options={\"format\":\"pdf\"}"
```

## Webhooks

Configure webhooks to receive notifications when documents are processed:

```http
POST /api/v1/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/documents",
  "events": ["document.completed", "document.failed"]
}
```

**Webhook payload:**
```json
{
  "event": "document.completed",
  "data": {
    "id": "doc_abc123",
    "status": "completed",
    "downloadUrl": "/api/v1/documents/doc_abc123/download"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```