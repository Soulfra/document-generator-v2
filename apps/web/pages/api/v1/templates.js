// Next.js API route for templates
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Only GET requests allowed' }
    });
  }

  const templates = [
    {
      id: 'business-plan',
      name: 'Business Plan',
      description: 'Comprehensive business plan template with financial projections',
      category: 'business',
      features: ['Executive Summary', 'Market Analysis', 'Financial Projections'],
      service: 'Next.js API Route'
    },
    {
      id: 'proposal',
      name: 'Project Proposal',
      description: 'Professional project proposal template',
      category: 'project',
      features: ['Project Scope', 'Timeline', 'Budget'],
      service: 'Next.js API Route'
    },
    {
      id: 'report',
      name: 'Technical Report',
      description: 'Technical documentation and reporting template',
      category: 'technical',
      features: ['Abstract', 'Methodology', 'Results'],
      service: 'Next.js API Route'
    },
    {
      id: 'resume',
      name: 'Professional Resume',
      description: 'Modern professional resume template',
      category: 'personal',
      features: ['Clean Design', 'ATS Friendly', 'Multiple Formats'],
      service: 'Next.js API Route'
    }
  ];

  res.status(200).json({ 
    templates,
    total: templates.length,
    service: 'Next.js API Route'
  });
}