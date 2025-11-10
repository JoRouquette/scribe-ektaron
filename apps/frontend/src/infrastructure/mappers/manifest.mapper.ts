import { ManifestDTO } from '../dto/Manifest.dto';
import { Manifest } from '../../domain/models/Manifest';
import { Page } from '../../domain/models/Page';
import { Slug } from '../../domain/value-objects/Slug';

export function toDomain(dto: ManifestDTO): Manifest {
  return {
    version: dto.version,
    generatedAt: new Date(dto.generatedAt),
    pages: dto.pages.map<Page>((p) => ({
      route: p.route,
      title: p.title,
      tags: p.tags ?? [],
      filePath: p.filePath,
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : undefined,
      slug: p.slug ? Slug.from(p.slug) : Slug.fromRoute(p.route),
    })),
  };
}
