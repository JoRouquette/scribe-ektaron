import { FolderConfig } from '../entities/folder-config';

export interface VaultPort<T> {
  collectFromFolder(folder: FolderConfig): Promise<T>;
}
