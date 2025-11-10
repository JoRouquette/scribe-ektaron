import { Manifest } from '../../domain/models/Manifest';

export interface TreeNode {
  name: string;
  path: string;
  route: string;
  children: TreeNode[];
  count: number;
}

export class BuildTreeUseCase {
  exec(m: Manifest): TreeNode {
    const root: TreeNode = { name: '', path: '', route: '/p', children: [], count: 0 };
    for (const p of m.pages) {
      const raw = p.route.startsWith('/p/') ? p.route.slice(3) : p.route.replace(/^\//, '');
      const parts = raw.split('/').filter(Boolean);
      let cur = root;
      parts.forEach((seg: string, i: number): void => {
        let next: TreeNode | undefined = cur.children.find((c: TreeNode) => c.name === seg);
        if (!next) {
          const np: string = (cur.path ? cur.path + '/' : '') + seg;
          next = { name: seg, path: np, route: '/p/' + np, children: [], count: 0 };
          cur.children.push(next);
        }
        cur = next;
        if (i === parts.length - 1) cur.count++;
      });

      (function bump(n: TreeNode) {
        n.count++;
      })(root);
    }
    return root;
  }
}
