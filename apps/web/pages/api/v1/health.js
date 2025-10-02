// Next.js API route for health check
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests allowed' }
    });
  }

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    service: 'Document Generator Web API',
    uptime: process.uptime()
  });
}