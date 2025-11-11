import { Injectable } from '@angular/core';
import { Manifest } from '../../domain/models/Manifest';

export type NodeKind = 'folder' | 'file';

export interface TreeNode {
  kind: NodeKind;
  name: string;
  label: string;
  path: string;
  route?: string;
  children?: TreeNode[];
  count: number;
}

@Injectable({ providedIn: 'root' })
export class BuildTreeUseCase {
  exec(m: Manifest): TreeNode {
    const root: TreeNode = this.folder('', '', '');

    for (const p of m.pages) {
      const segs = p.route.replace(/^\/+/, '').split('/').filter(Boolean);
      if (segs.length === 0) continue;

      let cur = root;

      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        const atLeaf = i === segs.length - 1;

        if (!atLeaf) {
          cur = this.ensureFolderChild(cur, seg);
          cur.count++;
        } else {
          const fileNode: TreeNode = {
            kind: 'file',
            name: seg,
            label: p.title?.trim() || this.pretty(seg),
            path: (cur.path ? cur.path + '/' : '') + seg,
            route: p.route,
            count: 1,
          };
          cur.children = cur.children ?? [];
          if (!cur.children.some((c) => c.kind === 'file' && c.name === seg)) {
            cur.children.push(fileNode);
          }
          cur.count++;
        }
      }
    }

    this.sortRec(root);
    return root;
  }

  private folder(name: string, label: string, path: string): TreeNode {
    return { kind: 'folder', name, label, path, children: [], count: 0 };
  }

  private ensureFolderChild(parent: TreeNode, seg: string): TreeNode {
    parent.children = parent.children ?? [];
    let next = parent.children.find((c) => c.kind === 'folder' && c.name === seg);
    if (!next) {
      const p = parent.path ? parent.path + '/' + seg : seg;
      next = this.folder(seg, this.pretty(seg), p);
      parent.children.push(next);
    }
    return next;
  }

  private pretty(kebab: string): string {
    const s = decodeURIComponent(kebab).replace(/[-_]+/g, ' ').trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  private sortRec(n: TreeNode): void {
    if (!n.children?.length) return;
    n.children.sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1;
      return a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' });
    });
    n.children.forEach((c) => this.sortRec(c));
  }
}
