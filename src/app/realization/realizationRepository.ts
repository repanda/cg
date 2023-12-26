// realizationRepository.ts
import { Realization } from './makeData';

export interface RealizationRepository {
  getAll(): Promise<Realization[]>;
  getById(id: string): Promise<Realization | undefined>;
  create(realization: Realization): Promise<void>;
  update(realization: Realization): Promise<void>;
  delete(id: string): Promise<void>;
}