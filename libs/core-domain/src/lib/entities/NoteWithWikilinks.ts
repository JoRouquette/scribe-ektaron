import type { PublishableNote } from './PublishableNote';
import type { ResolvedWikilink } from './ResolvedWikilink';
import type { WikilinkRef } from './WikilinkRef';

export interface NoteWithWikilinks extends PublishableNote {
  wikilinks: WikilinkRef[];
  resolvedWikilinks: ResolvedWikilink[];
}
