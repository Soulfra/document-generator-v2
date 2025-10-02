import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    setResult(null);

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult({
        success: true,
        message: `Successfully processed "${file.name}"`,
        downloadUrl: '#',
        size: Math.round(file.size / 1024) + ' KB'
      });
    } catch (error) {
      setResult({
        success: false,
        message: 'Error processing document: ' + error.message
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Document Generator V2</title>
        <meta name="description" content="Modern document generation platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <header className="header">
          <h1>🚀 Document Generator V2</h1>
          <p>Transform any document into a working solution</p>
        </header>

        <main className="main">
          <div className="upload-section">
            <h2>Upload Document</h2>
            <div className="file-input-container">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                accept=".pdf,.docx,.txt,.md"
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-label">
                {file ? file.name : 'Choose a file...'}
              </label>
            </div>

            {file && (
              <div className="file-info">
                <p><strong>File:</strong> {file.name}</p>
                <p><strong>Size:</strong> {Math.round(file.size / 1024)} KB</p>
                <p><strong>Type:</strong> {file.type || 'Unknown'}</p>
              </div>
            )}

            <button
              onClick={handleProcess}
              disabled={!file || processing}
              className="process-btn"
            >
              {processing ? 'Processing...' : 'Generate Document'}
            </button>
          </div>

          {result && (
            <div className={`result ${result.success ? 'success' : 'error'}`}>
              <h3>{result.success ? '✅ Success!' : '❌ Error'}</h3>
              <p>{result.message}</p>
              {result.success && (
                <div className="result-actions">
                  <p><strong>Generated file size:</strong> {result.size}</p>
                  <a href={result.downloadUrl} className="download-btn">
                    Download Result
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="features">
            <h2>Features</h2>
            <div className="feature-grid">
              <div className="feature">
                <h3>🎯 AI-Powered</h3>
                <p>Advanced AI processes your documents intelligently</p>
              </div>
              <div className="feature">
                <h3>⚡ Fast Processing</h3>
                <p>Lightning-fast document generation and transformation</p>
              </div>
              <div className="feature">
                <h3>🔧 Multiple Formats</h3>
                <p>Support for PDF, DOCX, TXT, and Markdown files</p>
              </div>
              <div className="feature">
                <h3>🔒 Secure</h3>
                <p>Enterprise-grade security for your documents</p>
              </div>
            </div>
          </div>

          <div className="stats">
            <h2>Platform Status</h2>
            <div className="stats-grid">
              <div className="stat">
                <span className="stat-number">2.0</span>
                <span className="stat-label">Version</span>
              </div>
              <div className="stat">
                <span className="stat-number">🟢</span>
                <span className="stat-label">API Status</span>
              </div>
              <div className="stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>
            Built with ❤️ by{' '}
            <a href="https://github.com/Soulfra" target="_blank" rel="noopener noreferrer">
              Soulfra
            </a>
          </p>
          <div className="footer-links">
            <a href="/api/docs">API Docs</a>
            <a href="https://github.com/Soulfra/document-generator-v2">GitHub</a>
            <a href="/docs">Documentation</a>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .header {
          text-align: center;
          margin: 2rem 0;
        }

        .header h1 {
          font-size: 3rem;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .header p {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0.5rem 0;
        }

        .main {
          max-width: 800px;
          width: 100%;
        }

        .upload-section {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .upload-section h2 {
          margin-top: 0;
          text-align: center;
        }

        .file-input-container {
          margin: 1.5rem 0;
        }

        .file-input {
          display: none;
        }

        .file-label {
          display: block;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px dashed rgba(255, 255, 255, 0.3);
          border-radius: 0.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-label:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .file-info {
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .file-info p {
          margin: 0.25rem 0;
        }

        .process-btn {
          width: 100%;
          padding: 1rem;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .process-btn:disabled {
          background: #666;
          cursor: not-allowed;
        }

        .process-btn:not(:disabled):hover {
          background: #45a049;
        }

        .result {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .result.success {
          border-color: #4CAF50;
        }

        .result.error {
          border-color: #f44336;
        }

        .result h3 {
          margin-top: 0;
        }

        .download-btn {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          background: #2196F3;
          color: white;
          text-decoration: none;
          border-radius: 0.5rem;
          margin-top: 1rem;
          transition: background 0.3s ease;
        }

        .download-btn:hover {
          background: #1976D2;
        }

        .features {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .features h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature {
          text-align: center;
        }

        .feature h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.3rem;
        }

        .stats {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stats h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          display: block;
          opacity: 0.8;
        }

        .footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 2rem;
        }

        .footer-links {
          margin-top: 1rem;
        }

        .footer-links a {
          color: white;
          text-decoration: none;
          margin: 0 1rem;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .footer-links a:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .header h1 {
            font-size: 2rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}