#!/usr/bin/env node

/**
 * Document Generator MVP Compactor
 * Main entry point that connects all working systems
 */

const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

class DocumentGeneratorMVP {
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.port = process.env.PORT || 8080;
        
        this.connections = new Set();
        this.services = {
            'mvp-compactor': 'running',
            'finishthisidea-complete': 'checking',
            'template-processor': 'checking',
            'static-files': 'running'
        };
        
        this.startTime = Date.now();
        console.log('🚀 Document Generator MVP Compactor starting...');
    }
    
    async initialize() {
        try {
            this.setupMiddleware();
            this.setupRoutes();
            this.setupWebSocket();
            await this.checkServices();
            console.log('✅ Document Generator MVP Compactor initialized');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            throw error;
        }
    }
    
    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(express.static('.'));
        
        // Serve FinishThisIdea-Complete as the main platform
        this.app.use('/platform', express.static('FinishThisIdea-Complete/public'));
        
        // CORS
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            next();
        });
        
        // Request logging
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.path}`);
            next();
        });
    }
    
    setupRoutes() {
        // Main route redirects to platform hub
        this.app.get('/', (req, res) => {
            res.redirect('/platform/platform-hub.html');
        });
        
        // Health check
        this.app.get('/api/health', (req, res) => {
            res.json({
                status: 'healthy',
                uptime: Date.now() - this.startTime,
                services: this.services,
                timestamp: new Date().toISOString()
            });
        });
        
        // Metrics API
        this.app.get('/api/metrics', (req, res) => {
            const uptime = Math.floor((Date.now() - this.startTime) / 1000);
            const activeConnections = this.connections.size;
            
            res.json({
                success: true,
                data: {
                    uptime: uptime,
                    activeConnections: activeConnections,
                    totalUsers: Math.floor(Math.random() * 50) + 10,
                    activeBattles: Math.floor(Math.random() * 20),
                    marketplaceIdeas: 147,
                    lastUpdate: new Date().toISOString(),
                    platform: {
                        totalUsers: Math.floor(Math.random() * 50) + 10,
                        activeBattles: Math.floor(Math.random() * 20),
                        marketplaceIdeas: 147
                    }
                }
            });
        });
        
        // Service status
        this.app.get('/api/services', (req, res) => {
            res.json({
                services: this.services,
                healthy: Object.values(this.services).filter(s => s === 'running').length,
                total: Object.keys(this.services).length
            });
        });
        
        // Customer portal routes
        this.app.get('/customer-portal', (req, res) => {
            res.redirect('/customer-portal/dashboard.html');
        });
        
        this.app.get('/register', (req, res) => {
            res.sendFile('customer-registration.html', { root: './FinishThisIdea-Complete/public' });
        });
        
        // Quick access routes to main systems
        this.app.get('/ai-arena', (req, res) => {
            res.redirect('/platform/games/ai-arena.html');
        });
        
        this.app.get('/marketplace', (req, res) => {
            res.redirect('/platform/marketplace/agent-marketplace.html');
        });
        
        this.app.get('/cleanup', (req, res) => {
            res.redirect('/platform/index.html');
        });
        
        // Catch-all for missing routes
        this.app.get('*', (req, res) => {
            res.status(404).json({
                error: 'Route not found',
                availableRoutes: [
                    '/',
                    '/platform/platform-hub.html',
                    '/api/health',
                    '/api/metrics',
                    '/ai-arena',
                    '/marketplace',
                    '/cleanup'
                ]
            });
        });
    }
    
    setupWebSocket() {
        this.wss.on('connection', (ws, req) => {
            console.log('📱 New WebSocket connection');
            this.connections.add(ws);
            
            // Send welcome message
            ws.send(JSON.stringify({
                type: 'connection',
                data: {
                    activeConnections: this.connections.size,
                    services: this.services,
                    timestamp: new Date().toISOString()
                }
            }));
            
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data);
                    this.handleWebSocketMessage(ws, message);
                } catch (error) {
                    console.error('WebSocket message error:', error);
                }
            });
            
            ws.on('close', () => {
                console.log('📱 WebSocket connection closed');
                this.connections.delete(ws);
            });
        });
        
        // Broadcast metrics every 30 seconds
        setInterval(() => {
            this.broadcastMetrics();
        }, 30000);
    }
    
    handleWebSocketMessage(ws, message) {
        switch (message.type) {
            case 'ping':
                ws.send(JSON.stringify({ type: 'pong' }));
                break;
                
            case 'get_services':
                ws.send(JSON.stringify({
                    type: 'services_update',
                    data: this.services
                }));
                break;
                
            default:
                console.log('Unknown WebSocket message:', message.type);
        }
    }
    
    broadcastMetrics() {
        const metrics = {
            activeConnections: this.connections.size,
            uptime: Math.floor((Date.now() - this.startTime) / 1000),
            services: this.services,
            timestamp: new Date().toISOString()
        };
        
        this.connections.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: 'metrics_update',
                    data: metrics
                }));
            }
        });
    }
    
    async checkServices() {
        console.log('🔍 Checking service availability...');
        
        // Check if FinishThisIdea-Complete exists
        try {
            if (fs.existsSync('FinishThisIdea-Complete/public/platform-hub.html')) {
                this.services['finishthisidea-complete'] = 'running';
                console.log('✅ FinishThisIdea-Complete platform found');
            } else {
                this.services['finishthisidea-complete'] = 'missing';
                console.log('❌ FinishThisIdea-Complete platform missing');
            }
        } catch (error) {
            this.services['finishthisidea-complete'] = 'error';
        }
        
        // Check if MCP template processor exists
        try {
            if (fs.existsSync('mcp/package.json')) {
                this.services['template-processor'] = 'available';
                console.log('✅ MCP template processor found');
            } else {
                this.services['template-processor'] = 'missing';
                console.log('❌ MCP template processor missing');
            }
        } catch (error) {
            this.services['template-processor'] = 'error';
        }
        
        console.log('📊 Service status:', this.services);
    }
    
    start() {
        this.server.listen(this.port, () => {
            console.log(`🚀 Document Generator MVP running on http://localhost:${this.port}`);
            console.log(`📊 Platform Hub: http://localhost:${this.port}/platform/platform-hub.html`);
            console.log(`🔌 WebSocket: ws://localhost:${this.port}`);
            console.log(`⚡ API Health: http://localhost:${this.port}/api/health`);
            console.log(`📈 Metrics: http://localhost:${this.port}/api/metrics`);
            
            console.log('\n🎯 Quick Access:');
            console.log(`  Main Platform: http://localhost:${this.port}/`);
            console.log(`  AI Arena: http://localhost:${this.port}/ai-arena`);
            console.log(`  Marketplace: http://localhost:${this.port}/marketplace`);
            console.log(`  Code Cleanup: http://localhost:${this.port}/cleanup`);
        });
    }
}

// Start if called directly
if (require.main === module) {
    const mvp = new DocumentGeneratorMVP();
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down Document Generator MVP...');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n🛑 Shutting down Document Generator MVP...');
        process.exit(0);
    });
    
    // Initialize and start
    mvp.initialize().then(() => {
        mvp.start();
    }).catch(error => {
        console.error('Failed to start Document Generator MVP:', error);
        process.exit(1);
    });
}

module.exports = DocumentGeneratorMVP;