export interface ContentStoragePort {
  /**
   * Persiste une page HTML pour une route donnée.
   * L'adapter décidera comment traduire la route en chemin de fichier.
   */
  savePage(params: { route: string; html: string }): Promise<void>;
}
