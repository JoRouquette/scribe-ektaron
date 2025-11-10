import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CatalogFacade } from '../../../application/facades/CatalogFacade';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-viewer',
  imports: [CommonModule],
  templateUrl: './viewer.component.html',
})
export class ViewerComponent {
  private route = inject(ActivatedRoute);
  private facade = inject(CatalogFacade);
  private sanitizer = inject(DomSanitizer);

  title = signal<string>('');
  html = signal<SafeHtml>('Chargement…' as any);

  constructor() {
    const path = this.route.snapshot.paramMap.get('path') ?? '';
    this.facade.getHtmlBySlugOrRoute(path).then((res) => {
      if (!res) {
        this.title.set('Introuvable');
        this.html.set('Contenu non disponible' as any);
        return;
      }
      this.title.set(res.title);
      this.html.set(this.sanitizer.bypassSecurityTrustHtml(res.html));
    });
  }
}
