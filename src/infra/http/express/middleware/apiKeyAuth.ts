import type { Request, Response, NextFunction } from 'express';

export function createApiKeyAuthMiddleware(expectedApiKey: string) {
  return function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
      return res.status(401).json({
        ok: false,
        error: 'Missing API key',
      });
    }

    if (apiKey !== expectedApiKey) {
      return res.status(403).json({
        ok: false,
        error: 'Invalid API key',
      });
    }

    return next();
  };
}
