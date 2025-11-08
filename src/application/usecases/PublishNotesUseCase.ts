import type { Note } from '../../domain/entities/Note';
import type { MarkdownRendererPort } from '../ports/MarkdownRendererPort';
import type { ContentStoragePort } from '../ports/ContentStoragePort';

export interface PublishNotesInput {
  notes: Note[];
}

export interface PublishNotesOutput {
  published: number;
  errors: { noteId: string; message: string }[];
}

export class PublishNotesUseCase {
  constructor(
    private readonly markdownRenderer: MarkdownRendererPort,
    private readonly contentStorage: ContentStoragePort
  ) {}

  async execute(input: PublishNotesInput): Promise<PublishNotesOutput> {
    let published = 0;
    const errors: { noteId: string; message: string }[] = [];

    for (const note of input.notes) {
      try {
        const bodyHtml = await this.markdownRenderer.render(note.markdown);
        const fullHtml = this.buildHtmlPage(note, bodyHtml);
        await this.contentStorage.savePage({
          route: note.route,
          html: fullHtml,
        });
        published++;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        errors.push({ noteId: note.id, message });
      }
    }

    return { published, errors };
  }

  private buildHtmlPage(note: Note, bodyHtml: string): string {
    const title = this.escapeHtml(note.frontmatter.title);
    const description = note.frontmatter.description
      ? this.escapeHtml(note.frontmatter.description)
      : '';
    const publishedAt = note.publishedAt.toISOString();
    const updatedAt = note.updatedAt.toISOString();
    const dateMeta = note.frontmatter.date ?? publishedAt;

    const metaDescriptionTag = description
      ? `<meta name="description" content="${description}">`
      : '';

    const tagsMeta = note.frontmatter.tags?.length
      ? `<meta name="keywords" content="${note.frontmatter.tags
          .map((t) => this.escapeHtml(t))
          .join(', ')}">`
      : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  ${metaDescriptionTag}
  ${tagsMeta}
  <meta name="publishedAt" content="${this.escapeHtml(publishedAt)}">
  <meta name="updatedAt" content="${this.escapeHtml(updatedAt)}">
  <meta name="originalDate" content="${this.escapeHtml(dateMeta)}">
</head>
<body>
${bodyHtml}
</body>
</html>`;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
