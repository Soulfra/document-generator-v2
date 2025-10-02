import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Docs() {
  const [apiDocs, setApiDocs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/docs')
      .then(res => res.json())
      .then(data => {
        setApiDocs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load API docs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading documentation...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Documentation - Document Generator V2</title>
        <meta name="description" content="Complete documentation for Document Generator V2" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>📚 Documentation</h1>
          <nav className="nav">
            <a href="/">← Back to App</a>
            <a href="/api/v1/docs">API Docs</a>
            <a href="https://github.com/Soulfra/document-generator-v2">GitHub</a>
          </nav>
        </header>

        <main className="main">
          <section className="section">
            <h2>🚀 Quick Start</h2>
            <div className="code-block">
              <pre>{`# Clone the repository
git clone https://github.com/Soulfra/document-generator-v2.git
cd document-generator-v2

# Setup and start
make setup
make dev

# Visit the app
open http://localhost:3000`}</pre>
            </div>
          </section>

          <section className="section">
            <h2>🔌 API Reference</h2>
            {apiDocs && (
              <div className="api-docs">
                <h3>{apiDocs.title}</h3>
                <p>{apiDocs.description}</p>
                <p><strong>Base URL:</strong> {apiDocs.baseUrl}</p>
                
                <h4>Available Endpoints:</h4>
                <ul className="endpoints">
                  {Object.entries(apiDocs.endpoints).map(([endpoint, description]) => (
                    <li key={endpoint}>
                      <code>{endpoint}</code> - {description}
                    </li>
                  ))}
                </ul>

                <h4>Example Usage:</h4>
                <div className="code-block">
                  <pre>{JSON.stringify(apiDocs.examples, null, 2)}</pre>
                </div>
              </div>
            )}
          </section>

          <section className="section">
            <h2>📖 Development Guides</h2>
            <div className="docs-grid">
              <a href="https://github.com/Soulfra/document-generator-v2/blob/main/docs/development.md" className="doc-card">
                <h3>🛠️ Development</h3>
                <p>Setup your development environment</p>
              </a>
              <a href="https://github.com/Soulfra/document-generator-v2/blob/main/docs/api.md" className="doc-card">
                <h3>🔌 API Guide</h3>
                <p>Complete API documentation</p>
              </a>
              <a href="https://github.com/Soulfra/document-generator-v2/blob/main/docs/deployment.md" className="doc-card">
                <h3>🚀 Deployment</h3>
                <p>Deploy to production</p>
              </a>
              <a href="https://github.com/Soulfra/document-generator-v2/blob/main/docs/architecture.md" className="doc-card">
                <h3>🏗️ Architecture</h3>
                <p>System design and structure</p>
              </a>
            </div>
          </section>

          <section className="section">
            <h2>🎯 Features</h2>
            <ul className="features-list">
              <li>✅ Document generation from templates</li>
              <li>✅ File upload and processing</li>
              <li>✅ RESTful API with multiple endpoints</li>
              <li>✅ React/Next.js web interface</li>
              <li>✅ Docker development environment</li>
              <li>✅ Comprehensive documentation</li>
              <li>✅ Professional monorepo structure</li>
            </ul>
          </section>
        </main>

        <footer className="footer">
          <p>Built with ❤️ by <a href="https://github.com/Soulfra">Soulfra</a></p>
        </footer>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eee;
        }

        .header h1 {
          font-size: 2.5rem;
          margin: 0 0 1rem 0;
          color: #2563eb;
        }

        .nav {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .nav a {
          color: #2563eb;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }

        .nav a:hover {
          background: #f3f4f6;
          border-color: #2563eb;
        }

        .main {
          max-width: 800px;
          margin: 0 auto;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .section h3 {
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: #374151;
        }

        .section h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }

        .code-block {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .code-block pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.9rem;
        }

        .api-docs {
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }

        .endpoints {
          list-style: none;
          padding: 0;
        }

        .endpoints li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .endpoints li:last-child {
          border-bottom: none;
        }

        .endpoints code {
          background: #e5e7eb;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', monospace;
          font-size: 0.9rem;
        }

        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .doc-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .doc-card:hover {
          border-color: #2563eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        .doc-card h3 {
          margin: 0 0 0.5rem 0;
          color: #2563eb;
        }

        .doc-card p {
          margin: 0;
          color: #6b7280;
        }

        .features-list {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          padding: 0.5rem 0;
          font-size: 1.1rem;
        }

        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.2rem;
          color: #6b7280;
        }

        .footer {
          text-align: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
        }

        .footer a {
          color: #2563eb;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .nav {
            gap: 1rem;
          }

          .docs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}