import { Asset } from '../../../domain/entities/Asset';
import { AssetStoragePort } from '../ports/AssetStoragePort';
import { LoggerPort } from '../../ports/LoggerPort';

export class UploadAssetsHandler {
  private readonly _logger;

  constructor(
    private readonly assetStorage: AssetStoragePort,
    logger?: LoggerPort
  ) {
    this._logger = logger?.child({
      handler: 'UploadAssetHandler',
    });
    this._logger?.debug('UploadAssetHandler initialized.');
  }

  async execute(): Promise<void> {}
}
