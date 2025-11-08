import express from 'express';
import cors from 'cors';

export interface CreateAppOptions {
  apiKey: string;
}

export function createApp(_options: CreateAppOptions) {
  const app = express();

  app.set('trust proxy', true);
  app.use(express.json());

  app.use(
    cors({
      origin(origin, callback) {
        // On autorise explicitement Obsidian + aucune origine (curl, monitoring)
        if (!origin) {
          return callback(null, true);
        }

        if (origin === 'app://obsidian.md') {
          return callback(null, true);
        }

        // Tu pourras ajouter ici des origins de dev (localhost) si besoin
        return callback(new Error('Not allowed by CORS'), false);
      },
    })
  );

  // --- Routes API ---
  const apiBase = '/api';

  app.get(`${apiBase}/ping`, (_req, res) => {
    // À terme, la version pourra venir du package.json ou d'une config.
    res.json({
      ok: true,
      service: 'personal-publish',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // Placeholder pour /api/upload (implémentation à faire plus tard)
  // app.post(`${apiBase}/upload`, apiKeyAuthMiddleware(_options.apiKey), uploadController);

  // 404 API simple (optionnel)
  app.use(`${apiBase}`, (_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found' });
  });

  return app;
}
