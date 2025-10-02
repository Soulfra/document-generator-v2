// Next.js API route for API documentation
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests allowed' }
    });
  }

  const baseUrl = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}`;

  res.status(200).json({
    title: 'Document Generator API V2 (Next.js)',
    version: '2.0.0',
    description: 'Built-in API routes for document generation and processing',
    baseUrl: `${baseUrl}/api/v1`,
    endpoints: {
      'GET /api/v1/health': 'Health check',
      'GET /api/v1/docs': 'API documentation',
      'POST /api/v1/documents/generate': 'Generate document from template',
      'GET /api/v1/templates': 'List available templates'
    },
    note: 'These are Next.js API routes built into the web application',
    examples: {
      health: {
        method: 'GET',
        url: '/api/v1/health'
      },
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
}