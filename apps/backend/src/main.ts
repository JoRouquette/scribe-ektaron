import { createApp } from './infra/http/express/app';

async function bootstrap() {
  const { app, EnvConfig, logger } = createApp();

  app.listen(EnvConfig.port(), () => {
    logger.info(`Server listening on port ${EnvConfig.port()}`);
  });
}

bootstrap().catch((err) => {
  console.error('Fatal error on bootstrap', err);
  process.exit(1);
});
