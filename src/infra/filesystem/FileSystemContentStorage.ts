import { promises as fs } from 'fs';
import path from 'path';
import type { ContentStoragePort } from '../../application/ports/ContentStoragePort';

export class FileSystemContentStorage implements ContentStoragePort {
  constructor(private readonly rootDir: string) {}

  async savePage(params: { route: string; html: string }): Promise<void> {
    const normalizedRoute = this.normalizeRoute(params.route);
    const segments = normalizedRoute.split('/').filter(Boolean);
    const dir = path.join(this.rootDir, ...segments);

    await fs.mkdir(dir, { recursive: true });

    const filePath = path.join(dir, 'index.html');
    await fs.writeFile(filePath, params.html, 'utf8');
  }

  private normalizeRoute(route: string): string {
    let r = route.trim();

    if (!r.startsWith('/')) {
      r = '/' + r;
    }

    // On enlève les slashs de fin sauf pour la racine
    if (r.length > 1) {
      r = r.replace(/\/+$/, '');
    }

    return r;
  }
}
