import type { PublishableNote } from '../entities/publishable-note';
import type { SanitizationRules } from '../entities/sanitization-rules';

export interface ContentSanitizerPort {
  sanitizeNote(
    note: PublishableNote,
    rules: SanitizationRules | undefined
  ): PublishableNote;
}

// Alias for backward compatibility
export type ContentSanitizer = ContentSanitizerPort;
