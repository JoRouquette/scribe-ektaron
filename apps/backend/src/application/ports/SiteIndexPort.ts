import { LoggerPort } from './LoggerPort';

export interface ManifestPage {
  id: string;
  route: string;
  title: string;
  description?: string;
  tags?: string[];
  publishedAt: Date;
  updatedAt: Date;
  slug: string;
}

export interface Manifest {
  pages: ManifestPage[];
}

/**
 * Gestion de l'indexation du site (manifest + index des dossiers).
 */
export interface SiteIndexPort {
  saveManifest(manifest: Manifest, logger?: LoggerPort): Promise<void>;

  rebuildAllIndexes(manifest: Manifest, logger?: LoggerPort): Promise<void>;
}
