export interface FinishSessionCommand {
  sessionId: string;
  notesProcessed: number;
  assetsProcessed: number;
}

export interface FinishSessionResult {
  sessionId: string;
  success: boolean;
  
}
