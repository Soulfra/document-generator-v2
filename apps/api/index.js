const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|docx|txt|md/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOCX, TXT, and MD files are allowed'));
    }
  }
});

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    uptime: process.uptime()
  });
});

// API root
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Document Generator API V2',
    version: '2.0.0',
    endpoints: {
      health: '/health',
      generate: '/api/v1/documents/generate',
      process: '/api/v1/process',
      templates: '/api/v1/templates',
      docs: '/api/v1/docs'
    }
  });
});

// Generate document
app.post('/api/v1/documents/generate', (req, res) => {
  const { template, content, format = 'pdf' } = req.body;

  if (!template || !content) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Template and content are required',
        details: {
          template: template ? 'valid' : 'required',
          content: content ? 'valid' : 'required'
        }
      }
    });
  }

  // Simulate document generation
  const documentId = 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  setTimeout(() => {
    res.json({
      id: documentId,
      status: 'completed',
      template,
      format,
      downloadUrl: `/api/v1/documents/${documentId}/download`,
      createdAt: new Date().toISOString(),
      metadata: {
        contentLength: content.length,
        estimatedPages: Math.ceil(content.length / 500),
        processingTime: '2.3s'
      }
    });
  }, 1000); // Simulate processing time
});

// Process uploaded file
app.post('/api/v1/process', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'No file uploaded',
      }
    });
  }

  const { originalname, filename, mimetype, size } = req.file;
  const options = req.body.options ? JSON.parse(req.body.options) : {};

  // Simulate file processing
  const processId = 'process_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  res.json({
    id: processId,
    status: 'processing',
    originalFile: {
      name: originalname,
      type: mimetype,
      size: size
    },
    options,
    downloadUrl: `/api/v1/documents/${processId}/download`,
    createdAt: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 30000).toISOString() // 30 seconds
  });
});

// List documents
app.get('/api/v1/documents', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Mock documents
  const mockDocuments = [
    {
      id: 'doc_sample_1',
      title: 'Business Plan Draft',
      status: 'completed',
      template: 'business-plan',
      createdAt: '2024-01-01T10:00:00Z',
      size: '245 KB'
    },
    {
      id: 'doc_sample_2', 
      title: 'Project Proposal',
      status: 'completed',
      template: 'proposal',
      createdAt: '2024-01-01T09:30:00Z',
      size: '156 KB'
    }
  ];

  res.json({
    documents: mockDocuments.slice((page - 1) * limit, page * limit),
    total: mockDocuments.length,
    page,
    limit,
    totalPages: Math.ceil(mockDocuments.length / limit)
  });
});

// Download document (mock)
app.get('/api/v1/documents/:id/download', (req, res) => {
  const { id } = req.params;
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="document-${id}.pdf"`);
  
  // Send mock PDF content
  res.send(Buffer.from(`Mock PDF content for document ${id}`));
});

// List templates
app.get('/api/v1/templates', (req, res) => {
  const templates = [
    {
      id: 'business-plan',
      name: 'Business Plan',
      description: 'Comprehensive business plan template with financial projections',
      category: 'business',
      features: ['Executive Summary', 'Market Analysis', 'Financial Projections']
    },
    {
      id: 'proposal',
      name: 'Project Proposal',
      description: 'Professional project proposal template',
      category: 'project',
      features: ['Project Scope', 'Timeline', 'Budget']
    },
    {
      id: 'report',
      name: 'Technical Report',
      description: 'Technical documentation and reporting template',
      category: 'technical',
      features: ['Abstract', 'Methodology', 'Results']
    }
  ];

  res.json({ templates });
});

// Get specific template
app.get('/api/v1/templates/:id', (req, res) => {
  const { id } = req.params;
  
  const templates = {
    'business-plan': {
      id: 'business-plan',
      name: 'Business Plan',
      description: 'Comprehensive business plan template',
      category: 'business',
      structure: {
        sections: [
          'Executive Summary',
          'Company Description', 
          'Market Analysis',
          'Organization & Management',
          'Products & Services',
          'Marketing & Sales',
          'Financial Projections'
        ]
      },
      variables: ['company_name', 'industry', 'target_market', 'funding_amount']
    }
  };

  const template = templates[id];
  if (!template) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `Template '${id}' not found`
      }
    });
  }

  res.json(template);
});

// API documentation
app.get('/api/v1/docs', (req, res) => {
  res.json({
    title: 'Document Generator API V2',
    version: '2.0.0',
    description: 'RESTful API for document generation and processing',
    baseUrl: `http://localhost:${PORT}/api/v1`,
    endpoints: {
      'GET /health': 'Health check',
      'GET /api/v1': 'API information',
      'POST /api/v1/documents/generate': 'Generate document from template',
      'POST /api/v1/process': 'Process uploaded file',
      'GET /api/v1/documents': 'List documents',
      'GET /api/v1/documents/:id/download': 'Download document',
      'GET /api/v1/templates': 'List templates',
      'GET /api/v1/templates/:id': 'Get template details'
    },
    examples: {
      generate: {
        method: 'POST',
        url: '/api/v1/documents/generate',
        body: {
          template: 'business-plan',
          content: 'My startup idea description...',
          format: 'pdf'
        }
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: {
          code: 'FILE_TOO_LARGE',
          message: 'File size exceeds 10MB limit'
        }
      });
    }
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Endpoint ${req.method} ${req.path} not found`,
      suggestion: 'Visit /api/v1 for available endpoints'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Document Generator API V2 running on port ${PORT}`);
  console.log(`📖 API docs available at http://localhost:${PORT}/api/v1/docs`);
  console.log(`❤️  Health check at http://localhost:${PORT}/health`);
});

module.exports = app;