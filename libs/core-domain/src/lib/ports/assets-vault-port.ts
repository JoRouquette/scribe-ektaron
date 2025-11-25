import type { PublishableNote } from '../entities/PublishableNote';
import type { AssetRef } from '../entities/AssetRef';
import { ResolvedAssetFile } from '../entities/ResolvedAssetFile';

export interface AssetsVaultPort {
  resolveAssetForNote(
    note: PublishableNote,
    asset: AssetRef,
    assetsFolder: string,
    enableVaultFallback: boolean
  ): Promise<ResolvedAssetFile | null>;
}
