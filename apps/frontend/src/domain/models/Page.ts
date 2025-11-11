import { Slug } from '../value-objects/Slug';

export interface Page {
  route: string;
  title: string;
  tags: string[];
  filePath: string;
  slug: Slug;
  updatedAt?: Date;
}
