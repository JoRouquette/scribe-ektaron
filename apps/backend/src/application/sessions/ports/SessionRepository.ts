import { Session } from '../../../domain/entities/Session';

export interface SessionRepository {
  create(session: Session): Promise<void>;
  findById(id: string): Promise<Session | null>;
  save(session: Session): Promise<void>;
}
