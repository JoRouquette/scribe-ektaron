import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, shareReplay } from 'rxjs';
import { ConfigRepository, PublicConfig } from '../../domain/ports/ConfigRepository';

@Injectable({ providedIn: 'root' })
export class HttpConfigRepository implements ConfigRepository {
  private http = inject(HttpClient);
  private cache$ = this.http.get<PublicConfig>('/api/public-config').pipe(shareReplay(1));
  load(): Promise<PublicConfig> {
    return firstValueFrom(this.cache$);
  }
}
