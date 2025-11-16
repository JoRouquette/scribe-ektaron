import express from 'express';
import { createPingController } from './controllers/pingController';
import { createUploadController } from './controllers/uploadController';
import { createAssetsUploadController } from './controllers/assetsUploadController';

// Adapters / services
import { MarkdownItRenderer } from '../../markdown/MarkdownItRenderer';
import { FileSystemContentStorage } from '../../filesystem/FileSystemContentStorage';
import { FileSystemSiteIndex } from '../../filesystem/FileSystemSiteIndex';
import { FileSystemAssetStorage } from '../../filesystem/FileSystemAssetStorage';

import { PublishNotesUseCase } from '../../../application/usecases/PublishNotesUseCase';
import { UploadAssetUseCase } from '../../../application/usecases/UploadAssetUseCase';
import { EnvConfig } from '../../config/EnvConfig';
import { createCorsMiddleware } from './middleware/corsMiddleware';
import { createApiKeyAuthMiddleware } from './middleware/apiKeyAuthMiddleware';
import { ConsoleLogger } from '../../logging/ConsoleLogger';

export function createApp() {
  const app = express();

  app.use(express.json({ limit: '10mb' })); // à adapter si nécessaire

  app.use(createCorsMiddleware(EnvConfig.allowedOrigins()));
  const apiKeyMiddleware = createApiKeyAuthMiddleware(EnvConfig.apiKey());

  // Static assets
  app.use('/assets', express.static(EnvConfig.assetsRoot()));

  // Construct use cases & adapters
  const rootLogger = new ConsoleLogger({ level: EnvConfig.loggerLevel() });

  const markdownRenderer = new MarkdownItRenderer();
  const contentStorage = new FileSystemContentStorage(
    EnvConfig.contentRoot(),
    rootLogger.child({ adapter: 'FileSystemContentStorage' })
  );
  const siteIndex = new FileSystemSiteIndex(
    EnvConfig.contentRoot(),
    rootLogger.child({ adapter: 'FileSystemSiteIndex' })
  );
  const assetStorage = new FileSystemAssetStorage(
    EnvConfig.assetsRoot(),
    rootLogger.child({ adapter: 'FileSystemAssetStorage' })
  );

  const publishNotesUseCase = new PublishNotesUseCase(
    markdownRenderer,
    contentStorage,
    siteIndex,
    rootLogger.child({ useCase: 'PublishNotesUseCase' })
  );
  const uploadAssetUseCase = new UploadAssetUseCase(
    assetStorage,
    rootLogger.child({ useCase: 'UploadAssetUseCase' })
  );

  // API routes (protégées par API key)
  const apiRouter = express.Router();
  apiRouter.use(apiKeyMiddleware);

  apiRouter.use(createPingController(rootLogger.child({ controller: 'pingController' })));
  apiRouter.use(
    createUploadController(
      publishNotesUseCase,
      rootLogger.child({ controller: 'uploadController' })
    )
  );
  apiRouter.use(
    createAssetsUploadController(
      uploadAssetUseCase,
      rootLogger.child({ controller: 'assetsUploadController' })
    )
  );

  app.use('/api', apiRouter);

  return { app, EnvConfig, logger: rootLogger };
}
