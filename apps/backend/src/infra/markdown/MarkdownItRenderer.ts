import MarkdownIt from 'markdown-it';
import type { MarkdownRendererPort } from '../../application/ports/MarkdownRendererPort';

export class MarkdownItRenderer implements MarkdownRendererPort {
  private readonly md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt({
      html: false,
      linkify: true,
      typographer: true,
    });
  }

  async render(markdown: string): Promise<string> {
    return this.md.render(markdown);
  }
}
