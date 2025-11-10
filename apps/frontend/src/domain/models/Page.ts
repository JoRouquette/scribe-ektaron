import { Slug } from '../value-objects/Slug';

export interface Page {
  route: string; // ex: "/p/demo"
  title: string;
  tags: string[];
  filePath: string;
  slug: Slug;
  updatedAt?: Date;
}
