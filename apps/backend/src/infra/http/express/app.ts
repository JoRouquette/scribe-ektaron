import express from 'express';
import type { PublishNotesUseCase } from '../../../application/usecases/PublishNotesUseCase';
import { createUploadController } from './controllers/uploadController';
import { createApiKeyAuthMiddleware } from './middleware/apiKeyAuth';
import path from 'node:path';
import { stat } from 'node:fs';

export interface CreateAppOptions {
  uiRoot: string;
  contentRoot: string;
  apiKey: string;
  publishNotesUseCase: PublishNotesUseCase;
}

export function createApp(options: CreateAppOptions) {
  const app = express();
  const apiBase = '/api';

  app.set('trust proxy', true);
  app.use(express.json({ limit: '10mb' }));

  app.get('/health', (_req, res) => res.status(200).send('ok'));

  app.get(`${apiBase}/ping`, (_req, res) => {
    res.json({
      ok: true,
      status: 200,
      service: 'personal-publish',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  const apiKeyAuth = createApiKeyAuthMiddleware(options.apiKey);
  const uploadController = createUploadController(options.publishNotesUseCase);
  app.post(`${apiBase}/upload`, apiKeyAuth, uploadController);

  app.get(`${apiBase}/public-config`, (_req, res) => {
    res.json({
      siteName: 'Scribe d’Ektaron',
      author: process.env.AUTHOR ?? 'Anonyme',
      repoUrl: process.env.REPO_URL ?? '',
    });
  });

  app.use(apiBase, (_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found' });
  });

  app.use(
    '/content',
    express.static(options.contentRoot, {
      fallthrough: true,
      maxAge: '1h',
    })
  );

  app.use(
    '/',
    express.static(options.uiRoot, {
      fallthrough: true,
      index: false,
      maxAge: '1h',
    })
  );

  app.get('*', (_req, res) => {
    res.sendFile(path.join(options.uiRoot, 'index.html'));
  });

  return app;
}
