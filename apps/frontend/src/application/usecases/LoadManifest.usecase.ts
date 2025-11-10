import { ManifestRepository } from '../../domain/ports/ManifestRepository';
import { Manifest } from '../../domain/models/Manifest';

export class LoadManifestUseCase {
  constructor(private repo: ManifestRepository) {}
  exec(): Promise<Manifest> {
    return this.repo.load();
  }
}
