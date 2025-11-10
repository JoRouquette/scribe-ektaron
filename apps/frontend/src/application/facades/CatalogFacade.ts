import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpManifestRepository } from '../../infrastructure/http/HttpManifestRepository';
import { LoadManifestUseCase } from '../usecases/LoadManifest.usecase';
import { SearchPagesUseCase } from '../usecases/SearchPages.usecase';
import { FindPageUseCase } from '../usecases/FindPage.usecase';
import { HtmlGateway } from '../../domain/ports/HtmlGateway';
import { HttpHtmlGateway } from '../../infrastructure/http/HttpHtmlGateway';
import { Manifest } from '../../domain/models/Manifest';

@Injectable({ providedIn: 'root' })
export class CatalogFacade {
  private manifestRepo = inject(HttpManifestRepository);
  private html = inject<HtmlGateway>(HttpHtmlGateway);

  private loadManifest = new LoadManifestUseCase(this.manifestRepo);
  private searchUc = new SearchPagesUseCase();
  private findUc = new FindPageUseCase();

  // State
  manifest = signal<Manifest | null>(null);
  query = signal('');
  loading = signal(false);
  error = signal<string | null>(null);

  results = computed(() => {
    const m = this.manifest();
    if (!m) return [];
    return this.searchUc.exec(m, this.query());
  });

  async ensureManifest(): Promise<void> {
    if (this.manifest()) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      const m = await this.loadManifest.exec();
      this.manifest.set(m);
    } catch (e: any) {
      this.error.set('Manifest indisponible');
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
    const raw = await this.html.fetch(page.filePath);
    return { title: page.title, html: raw };
  }
}
