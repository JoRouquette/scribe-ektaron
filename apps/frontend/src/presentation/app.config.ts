import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { CONFIG_REPOSITORY, HTML_GATEWAY, MANIFEST_REPOSITORY } from '../domain/ports/tokens';
import { HttpConfigRepository } from '../infrastructure/http/HttpConfigRepository';
import { HttpHtmlGateway } from '../infrastructure/http/HttpHtmlGateway';
import { HttpManifestRepository } from '../infrastructure/http/HttpManifestRepository';
import { APP_ROUTES } from './routes/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    { provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-symbols-rounded' } },
    provideHttpClient(withFetch()),
    HttpConfigRepository,
    HttpManifestRepository,
    HttpHtmlGateway,
    { provide: MANIFEST_REPOSITORY, useExisting: HttpManifestRepository },
    { provide: CONFIG_REPOSITORY, useExisting: HttpConfigRepository },
    { provide: HTML_GATEWAY, useExisting: HttpHtmlGateway },
  ],
};
