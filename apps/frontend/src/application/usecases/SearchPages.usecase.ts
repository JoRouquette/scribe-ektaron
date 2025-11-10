import { Manifest } from '../../domain/models/Manifest';
import { Page } from '../../domain/models/Page';

export class SearchPagesUseCase {
  exec(manifest: Manifest, query: string): Page[] {
    const q = query.trim().toLowerCase();
    if (!q) return manifest.pages;
    return manifest.pages.filter(
      (p) =>
        (p.title ?? '').toLowerCase().includes(q) ||
        (p.tags ?? []).some((t) => t.toLowerCase().includes(q)),
    );
  }
}
