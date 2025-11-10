import { Page } from './Page';

export interface Manifest {
  version: number;
  generatedAt: Date;
  pages: Page[];
}
