import { PageDTO } from './Page.dto';

export interface ManifestDTO {
  version: number;
  generatedAt: string;
  pages: PageDTO[];
}
