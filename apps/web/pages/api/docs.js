// Redirect to full API docs
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests allowed' }
    });
  }

  // Redirect to full API documentation
  res.redirect(302, '/api/v1/docs');
}