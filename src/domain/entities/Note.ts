export interface NoteFrontmatter {
  title: string;
  description?: string;
  date?: string; // ISO string, on raffinera si besoin en Value Object
  tags?: string[];
}

export interface Note {
  id: string;
  slug: string;
  route: string; // ex: "/blog/my-note"
  markdown: string;
  frontmatter: NoteFrontmatter;
  publishedAt: Date;
  updatedAt: Date;
}
