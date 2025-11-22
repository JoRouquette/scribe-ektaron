export interface CreateSessionCommand {
  notesPlanned: number;
  assetsPlanned: number;
  batchConfig: {
    maxBytesPerRequest: number;
  };
}

export interface CreateSessionResult {
  sessionId: string;
  success: boolean;
  notesUploadUrl: string;
  assetsUploadUrl: string;
  finishSessionUrl: string;
  abortSessionUrl: string;
  maxBytesPerRequest: number;
}
