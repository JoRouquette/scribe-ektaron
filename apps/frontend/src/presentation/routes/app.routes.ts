import { Routes, UrlSegment } from '@angular/router';

function pageMatcher(segments: UrlSegment[]) {
  if (segments.length >= 1 && segments[0].path === 'p') {
    const rest = segments
      .slice(1)
      .map((s) => s.path)
      .join('/');
    return { consumed: segments, posParams: { path: new UrlSegment(rest, {}) } };
  }
  return null;
}

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../shell/shell.component').then((m) => m.ShellComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        matcher: pageMatcher,
        loadComponent: () =>
          import('../pages/viewer/viewer.component').then((m) => m.ViewerComponent),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
