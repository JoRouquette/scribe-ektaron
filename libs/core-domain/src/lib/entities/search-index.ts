export interface ContentSearchIndexEntry {
  route: string;
  title: string;
  sentences: string[];
}

export interface ContentSearchIndex {
  sessionId?: string;
  builtAt: string;
  entries: ContentSearchIndexEntry[];
}
