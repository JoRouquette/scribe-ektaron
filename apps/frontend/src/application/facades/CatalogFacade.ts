import { computed, Inject, Injectable, signal } from '@angular/core';
import { Manifest } from '../../domain/models/Manifest';
import { ContentRepository } from '../../domain/ports/ContentRepository';
import { ManifestRepository } from '../../domain/ports/ManifestRepository';
import { CONTENT_REPOSITORY, MANIFEST_REPOSITORY } from '../../domain/ports/tokens';
import { FindPageUseCase } from '../usecases/FindPage.usecase';
import { LoadManifestUseCase } from '../usecases/LoadManifest.usecase';
import { SearchPagesUseCase } from '../usecases/SearchPages.usecase';

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private readonly loadManifest: LoadManifestUseCase;
  private readonly searchUc: SearchPagesUseCase;
  private readonly findUc: FindPageUseCase;

  manifest = signal<Manifest>({ pages: [] });
  query = signal('');
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    @Inject(MANIFEST_REPOSITORY) private readonly manifestRepository: ManifestRepository,
    @Inject(CONTENT_REPOSITORY) private readonly contentRepository: ContentRepository
  ) {
    console.log('CatalogFacade initialized with manifestRepo and contentRepo');

    this.loadManifest = new LoadManifestUseCase(this.manifestRepository);
    this.loadManifest.exec().then((m) => {
      this.manifest.set(m);
      console.log('Initial manifest loaded in CatalogFacade:', m);
    });

    this.searchUc = new SearchPagesUseCase();
    this.findUc = new FindPageUseCase();

    console.log('LoadManifestUseCase, SearchPagesUseCase, and FindPageUseCase initialized');
  }

  results = computed(() => {
    const m = this.manifest();
    if (!m) return [];
    return this.searchUc.exec(m, this.query());
  });

  async ensureManifest(): Promise<void> {
    if (this.manifest()) {
      console.log('Manifest already loaded, skipping load');
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    try {
      const m = await this.loadManifest.exec();
      this.manifest.set(m);
    } catch (e) {
      this.error.set(
        'Manifest indisponible pour le moment :' + (e instanceof Error ? ' ' + e.message : '')
      );
    } finally {
      this.loading.set(false);
    }
  }

  async getHtmlBySlugOrRoute(slugOrRoute: string): Promise<{ title: string; html: string } | null> {
    await this.ensureManifest();
    const m = this.manifest();
    if (!m) return null;
    const page = this.findUc.exec(m, slugOrRoute);
    if (!page) return null;
    const raw = await this.contentRepository.fetch(page.route ?? page.slug);
    return { title: page.title, html: raw };
  }
}
