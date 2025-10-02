// Next.js API route for document generation
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Only POST requests allowed' }
    });
  }

  const { template, content, format = 'pdf' } = req.body;

  // Validation
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
  
  // Simulate processing delay
  setTimeout(() => {
    res.status(200).json({
      id: documentId,
      status: 'completed',
      template,
      format,
      downloadUrl: `/api/v1/documents/${documentId}/download`,
      createdAt: new Date().toISOString(),
      metadata: {
        contentLength: content.length,
        estimatedPages: Math.ceil(content.length / 500),
        processingTime: '1.2s',
        service: 'Next.js API Route'
      }
    });
  }, 100); // Shorter delay for web API
}