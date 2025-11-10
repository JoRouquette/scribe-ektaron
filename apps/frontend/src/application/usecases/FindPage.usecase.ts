import { Manifest } from '../../domain/models/Manifest';
import { Page } from '../../domain/models/Page';

export class FindPageUseCase {
  exec(manifest: Manifest, slugOrRoute: string): Page | undefined {
    return manifest.pages.find(
      (p) =>
        p.slug.value === slugOrRoute || p.route === `/p/${slugOrRoute}` || p.route === slugOrRoute,
    );
  }
}
