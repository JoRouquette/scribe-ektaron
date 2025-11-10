import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, shareReplay } from 'rxjs';
import { ManifestRepository } from '../../domain/ports/ManifestRepository';
import { Manifest } from '../../domain/models/Manifest';
import { ManifestDTO } from '../dto/Manifest.dto';
import { toDomain } from '../mappers/manifest.mapper';

@Injectable({ providedIn: 'root' })
export class HttpManifestRepository implements ManifestRepository {
  private http = inject(HttpClient);
  private cache$ = this.http.get<ManifestDTO>('/content/_manifest.json').pipe(shareReplay(1));

  async load(): Promise<Manifest> {
    const dto = await firstValueFrom(this.cache$);
    return toDomain(dto);
  }
}
