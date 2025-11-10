import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CatalogFacade } from '../../../application/facades/CatalogFacade';
import { BuildTreeUseCase, TreeNode } from '../../../application/usecases/BuildTree.usecase';

@Component({
  standalone: true,
  selector: 'app-vault-explorer',
  imports: [CommonModule, RouterLink],
  templateUrl: './vault-explorer.component.html',
  styleUrls: ['./vault-explorer.component.scss'],
})
export class VaultExplorerComponent {
  private facade = inject(CatalogFacade);
  private build = new BuildTreeUseCase();

  tree = signal<TreeNode | null>(null);

  constructor() {
    this.facade.ensureManifest().then(() => {
      const m = this.facade.manifest();
      this.tree.set(m ? this.build.exec(m) : null);
    });
  }
}
