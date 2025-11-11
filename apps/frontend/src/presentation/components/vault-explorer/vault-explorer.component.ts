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
  private readonly facade = inject(CatalogFacade);
  private readonly build = new BuildTreeUseCase();

  tree = signal<TreeNode | null>(null);

  q = signal<string>('');

  filteredTree = computed(() => this.filterTree(this.tree(), this.q().trim().toLowerCase()));

  constructor() {
    this.facade.ensureManifest().then(() => {
      const m = this.facade.manifest();
      console.log('Building vault tree from manifest with', m?.pages?.length ?? 0, 'pages');
      this.tree.set(m ? this.build.exec(m) : null);
    });
  }

  onInputQuery(value: string) {
    this.q.set(value ?? '');
  }

  isFolder(n: TreeNode): boolean {
    return !!(n.children && n.children.length);
  }

  capitalize(s: string): string {
    if (!s) return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /** Filtrage récursif : garde le dossier si lui-même ou un descendant match. */
  private filterTree(node: TreeNode | null, q: string): TreeNode | null {
    if (!node) return null;
    if (!q) return node;

    const name = (node.name || 'root').toLowerCase();
    const selfMatch = name.includes(q);

    if (!node.children?.length) {
      return selfMatch ? node : null;
    }

    const filteredChildren = node.children
      .map((child) => this.filterTree(child, q))
      .filter((x): x is TreeNode => !!x);

    if (selfMatch || filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }

    return null;
  }
}
