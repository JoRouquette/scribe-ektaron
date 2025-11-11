import type { Note } from '../../domain/entities/Note';
import type { MarkdownRendererPort } from '../ports/MarkdownRendererPort';
import type { ContentStoragePort } from '../ports/ContentStoragePort';
import type { SiteIndexPort, Manifest, ManifestPage } from '../ports/SiteIndexPort';

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
    private readonly contentStorage: ContentStoragePort,
    private readonly siteIndex: SiteIndexPort
  ) {}

  async execute(input: PublishNotesInput): Promise<PublishNotesOutput> {
    let published = 0;
    const errors: { noteId: string; message: string }[] = [];
    const succeeded: Note[] = [];

    for (const note of input.notes) {
      try {
        const bodyHtml = await this.markdownRenderer.render(note.markdown);
        const fullHtml = this.buildHtmlPage(note, bodyHtml);

        await this.contentStorage.savePage({
          route: note.route,
          html: fullHtml,
        });

        published++;
        succeeded.push(note);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        errors.push({ noteId: note.id, message });
      }
    }

    if (succeeded.length > 0) {
      const pages: ManifestPage[] = succeeded.map((n) => ({
        route: n.route,
        slug: n.slug,
        vaultPath: n.vaultPath,
        relativePath: n.relativePath,
        title: this.extractTitle(n.vaultPath),
        description: n.frontmatter.description,
        tags: n.frontmatter.tags,
        publishedAt: n.publishedAt,
        updatedAt: n.updatedAt,
      }));
      pages.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

      const manifest: Manifest = { pages };
      await this.siteIndex.saveManifest(manifest);
      await this.siteIndex.rebuildAllIndexes(manifest);
    }

    return { published, errors };
  }

  private buildHtmlPage(note: Note, bodyHtml: string): string {
    const description = note.frontmatter.description
      ? this.escapeHtml(note.frontmatter.description)
      : '';
    const publishedAt = note.publishedAt.toISOString();

    return `
  <div class="markdown-body">
    <header class="site-header">
      <a href="/" class="home-link">Scribe Ektaron</a>
      ${description ? `<p class="site-tagline">${description}</p>` : '<p class="site-tagline">Publication personnelle</p>'}
      <p class="site-meta">Publié le ${this.escapeHtml(publishedAt.substring(0, 10))}</p>
    </header>
    <article class="page-content">
${bodyHtml}
    </article>
  </div>`;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private extractTitle(vaultPath: string): any {
    const parts = vaultPath.split('/');
    const filename = parts[parts.length - 1];
    const title = filename.replace(/\.mdx?$/i, '').replace(/-/g, ' ');
    return title.charAt(0).toUpperCase() + title.slice(1);
  }
}
