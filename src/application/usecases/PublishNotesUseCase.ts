import type { Note } from '../../domain/entities/Note';
import type { MarkdownRendererPort } from '../../application/ports/MarkdownRendererPort';
import type { ContentStoragePort } from '../../application/ports/ContentStoragePort';

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
    // Implémentation à faire dans une étape suivante.
    // Ici on garde juste la signature propre et indépendante d'Express/HTTP/FS.
    return {
      published: 0,
      errors: [],
    };
  }
}
