import type { PublishableNote } from '../entities/publishable-note';
import type { SanitizationRules } from '../entities/sanitization-rules';

export interface ContentSanitizerPort {
  sanitize(note: PublishableNote, rules: SanitizationRules | undefined): Promise<PublishableNote>;
}
