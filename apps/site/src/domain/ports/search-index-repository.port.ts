import { ContentSearchIndex } from '@core-domain';

export interface SearchIndexRepository {
  load(): Promise<ContentSearchIndex>;
}
