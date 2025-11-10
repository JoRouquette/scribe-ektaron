import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogFacade } from '../../../application/facades/CatalogFacade';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: `./home.component.html`,
})
export class HomeComponent {
  facade = inject(CatalogFacade);

  constructor() {
    this.facade.ensureManifest();
  }

  onQueryInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.facade.query.set(value);
  }
}
