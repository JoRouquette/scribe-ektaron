// apps/frontend/src/domain/ports/tokens.ts
import { InjectionToken } from '@angular/core';
import { ManifestRepository } from './ManifestRepository';
import { ConfigRepository } from './ConfigRepository';
import { HtmlGateway } from './HtmlGateway';

export const MANIFEST_REPOSITORY = new InjectionToken<ManifestRepository>('MANIFEST_REPOSITORY');
export const CONFIG_REPOSITORY = new InjectionToken<ConfigRepository>('CONFIG_REPOSITORY');
export const HTML_GATEWAY = new InjectionToken<HtmlGateway>('HTML_GATEWAY');
