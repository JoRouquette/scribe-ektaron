import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, shareReplay } from 'rxjs';
import { Manifest } from '../../domain/models/Manifest';
import { ManifestRepository } from '../../domain/ports/ManifestRepository';
import { ManifestDTO } from '../dto/Manifest.dto';
import { toDomain } from '../mappers/manifest.mapper';

@Injectable({ providedIn: 'root' })
export class HttpManifestRepository implements ManifestRepository {
  private cache$;

  constructor(private http: HttpClient) {
    this.cache$ = this.http.get<ManifestDTO>('/content/_manifest.json').pipe(shareReplay(1));
  }

  async load(): Promise<Manifest> {
    const dto = await firstValueFrom(this.cache$);
    return toDomain(dto);
  }
}
