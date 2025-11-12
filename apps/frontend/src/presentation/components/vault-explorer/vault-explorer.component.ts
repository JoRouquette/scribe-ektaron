import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule } from '@angular/material/tree';
import { RouterLink } from '@angular/router';

import { CatalogFacade } from '../../../application/facades/CatalogFacade';
import { BuildTreeUseCase, TreeNode } from '../../../application/usecases/BuildTree.usecase';

@Component({
  standalone: true,
  selector: 'app-vault-explorer',
  imports: [
    CdkTreeModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTreeModule,
    RouterLink,
  ],
  templateUrl: './vault-explorer.component.html',
  styleUrls: ['./vault-explorer.component.scss'],
})
export class VaultExplorerComponent implements OnInit {
  private visible = new WeakMap<TreeNode, TreeNode[]>();
  tree = signal<TreeNode | null>(null);
  q = signal<string>('');
  readonly EMPTY: ReadonlyArray<TreeNode> = [];
  rootChildren = computed(() => this.filteredRoot()?.children ?? (this.EMPTY as TreeNode[]));

  childrenOf = (n: TreeNode) => (this.q() ? this.visible.get(n) ?? [] : n.children ?? []);
  isFolder = (_: number, n: TreeNode) => n.kind === 'folder';
  isFile = (_: number, n: TreeNode) => n.kind === 'file';
  trackByPath = (_: number, n: TreeNode) => n.path ?? (n.label || n.name);

  filteredRoot = computed(() => {
    const root = this.tree();
    if (!root) return null;

    const query = this.q().trim().toLowerCase();
    this.visible = new WeakMap<TreeNode, TreeNode[]>();

    if (!query) return root;

    this.markVisible(root, query);
    return root;
  });

  constructor(
    private readonly facade: CatalogFacade,
    private readonly buildTree: BuildTreeUseCase
  ) {}

  ngOnInit(): void {
    this.facade.ensureManifest().then(() => {
      const m = this.facade.manifest();
      this.tree.set(m ? this.buildTree.exec(m) : null);
    });
  }

  onInputQuery(value: string) {
    this.q.set(value ?? '');
  }

  private markVisible(node: TreeNode, q: string): boolean {
    const selfMatch = (node.label || node.name).toLowerCase().includes(q);

    if (node.kind === 'file') return selfMatch;

    const kids = node.children ?? [];
    const vis: TreeNode[] = [];
    for (const c of kids) {
      if (this.markVisible(c, q)) vis.push(c);
    }
    if (selfMatch || vis.length) {
      this.visible.set(node, vis);
      return true;
    }
    return false;
  }
}
