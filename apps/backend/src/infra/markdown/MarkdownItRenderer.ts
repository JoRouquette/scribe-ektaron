import MarkdownIt from 'markdown-it';
import type { MarkdownRendererPort } from '../../application/ports/MarkdownRendererPort';

export class MarkdownItRenderer implements MarkdownRendererPort {
  private readonly md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt({
      html: false, // on désactive l’HTML brut pour limiter les XSS (sanitisation plus fine plus tard)
      linkify: true,
      typographer: true,
    });
  }

  async render(markdown: string): Promise<string> {
    return this.md.render(markdown);
  }
}
