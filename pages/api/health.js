/**
 * Health Check API Endpoint
 * Used by deployment platforms and monitoring tools to verify the application is running
 * GET /api/health
 */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  }

  res.status(200).json(healthCheck)
}
