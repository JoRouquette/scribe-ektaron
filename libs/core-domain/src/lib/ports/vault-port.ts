import { FolderConfig } from '../entities/FolderConfig';

export interface VaultPort<T> {
  collectFromFolder(folder: FolderConfig): Promise<T>;
}
