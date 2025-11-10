import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../services/theme.service';
import { ConfigFacade } from '../../application/facades/ConfigFacade';
import { CatalogFacade } from '../../application/facades/CatalogFacade';
import { VaultExplorerComponent } from '../components/vault-explorer/vault-explorer.component';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type Crumb = { label: string; url: string };

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    VaultExplorerComponent,
  ],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  theme = inject(ThemeService);
  private readonly config = inject(ConfigFacade);
  private readonly catalog = inject(CatalogFacade);
  private readonly router = inject(Router);

  author = () => this.config.cfg()?.author ?? '';
  siteName = () => this.config.cfg()?.siteName ?? '';
  repo = () => this.config.cfg()?.repoUrl ?? '';

  /** Titre de la page courante (si route /p/**), sinon chaîne vide */
  currentTitle = '';

  /** Breadcrumbs dérivés de l’URL /p/a/b/c */
  private _crumbs: Crumb[] = [];
  crumbs = () => this._crumbs;

  async ngOnInit() {
    this.theme.init();
    await this.config.ensure();
    await this.catalog.ensureManifest?.(); // au cas où ta façade l’expose ; sinon retire cette ligne

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.updateFromUrl());
    // première init
    this.updateFromUrl();
  }

  private updateFromUrl() {
    // Normalise l’URL (sans query/hash, sans trailing slash)
    const url = this.router.url.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

    // Breadcrumbs si /p/**
    const m = url.match(/^\/p\/(.+)$/);
    if (!m) {
      this._crumbs = [];
      this.currentTitle = '';
      return;
    }

    const parts = m[1].split('/').filter(Boolean);
    this._crumbs = parts.map((seg, i) => ({
      label: decodeURIComponent(seg),
      url: '/p/' + parts.slice(0, i + 1).join('/'),
    }));

    // Titre courant depuis le manifest (fallback dernier segment)
    const manifest = this.catalog.manifest?.();
    if (manifest?.pages?.length) {
      const page = manifest.pages.find((p) => p.route === url);
      this.currentTitle = page?.title ?? decodeURIComponent(parts[parts.length - 1] || '');
    } else {
      this.currentTitle = decodeURIComponent(parts[parts.length - 1] || '');
    }
  }
}
