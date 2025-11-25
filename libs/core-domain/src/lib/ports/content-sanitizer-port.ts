import type { PublishableNote } from '../entities/PublishableNote';
import type { SanitizationRules } from '../entities/SanitizationRules';

export interface ContentSanitizerPort {
  sanitizeNote(
    note: PublishableNote,
    rules: SanitizationRules | undefined
  ): PublishableNote;
}

// Alias for backward compatibility
export type ContentSanitizer = ContentSanitizerPort;
