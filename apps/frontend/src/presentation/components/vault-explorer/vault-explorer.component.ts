import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import { CatalogFacade } from '../../../application/facades/CatalogFacade';
import { BuildTreeUseCase, TreeNode } from '../../../application/usecases/BuildTree.usecase';

@Component({
  standalone: true,
  selector: 'app-vault-explorer',
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './vault-explorer.component.html',
  styleUrls: ['./vault-explorer.component.scss'],
})
export class VaultExplorerComponent {
  tree = signal<TreeNode | null>(null);
  q = signal<string>('');

  filteredTree = computed(() => this.filterTree(this.tree(), this.q().trim().toLowerCase()));

  constructor(private readonly facade: CatalogFacade, private readonly build: BuildTreeUseCase) {
    this.facade.ensureManifest().then(() => {
      const m = this.facade.manifest();
      this.tree.set(m ? this.build.exec(m) : null);
    });
  }

  onInputQuery(value: string) {
    this.q.set(value ?? '');
  }

  isFolder(n: TreeNode): boolean {
    return n.kind === 'folder';
  }

  private filterTree(node: TreeNode | null, q: string): TreeNode | null {
    if (!node) return null;
    if (!q) return node;

    const selfMatch = (node.label || node.name).toLowerCase().includes(q);

    if (node.kind === 'file') {
      return selfMatch ? node : null;
    }

    const children = (node.children ?? [])
      .map((c) => this.filterTree(c, q))
      .filter((x): x is TreeNode => !!x);

    if (selfMatch || children.length) {
      return { ...node, children };
    }
    return null;
  }
}
