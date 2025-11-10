export interface PublicConfig {
  siteName: string;
  author: string;
  repoUrl: string;
}

export interface ConfigRepository {
  load(): Promise<PublicConfig>;
}
