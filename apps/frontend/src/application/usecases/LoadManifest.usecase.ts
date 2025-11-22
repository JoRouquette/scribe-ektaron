import { Manifest } from '../../domain/models/Manifest';
import { ManifestRepository } from '../../domain/ports/ManifestRepository';

export class LoadManifestUseCase {
  constructor(private readonly repository: ManifestRepository) {}

  exec(): Promise<Manifest> {
    return this.repository.load();
  }
}
