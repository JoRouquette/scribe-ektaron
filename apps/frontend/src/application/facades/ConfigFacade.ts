import { Injectable, inject, signal } from '@angular/core';
import { HttpConfigRepository } from '../../infrastructure/http/HttpConfigRepository';
import { PublicConfig } from '../../domain/ports/ConfigRepository';

@Injectable({ providedIn: 'root' })
export class ConfigFacade {
  private repo = inject(HttpConfigRepository);
  cfg = signal<PublicConfig | null>(null);
  async ensure() {
    if (!this.cfg()) this.cfg.set(await this.repo.load());
  }
}
