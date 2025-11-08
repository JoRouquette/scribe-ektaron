import 'dotenv/config';
import { createApp } from './infra/http/express/app';
import { loadEnvConfig } from './infra/config/EnvConfig';

async function bootstrap() {
  const config = loadEnvConfig();

  const app = createApp({
    apiKey: config.apiKey,
  });

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[personal-publish] Listening on port ${config.port} (NODE_ENV=${config.nodeEnv})`);
  });
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[personal-publish] Fatal error during bootstrap', err);
  process.exit(1);
});
