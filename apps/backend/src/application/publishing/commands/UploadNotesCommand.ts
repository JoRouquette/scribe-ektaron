export interface UploadNotesCommand {
  sessionId: string;
  files: Array<{ path: string; content: Buffer }>;
}

export interface UploadNotesResult {
  sessionId: string;
  published: number;
  errors?: { noteId: string; message: string }[];
}
