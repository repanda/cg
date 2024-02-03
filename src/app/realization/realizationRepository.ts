// realizationRepository.ts
import { Department } from '../shared/models';
import { Realization } from './makeData';

export interface RealizationRepository {
  getRealizationForDepartmentAndMonth(departmentKey: Department, year: number, month: number): Promise<Realization | undefined>;
  getAll(): Promise<Realization[]>;
  getById(id: string): Promise<Realization | undefined>;
  create(realization: Realization): Promise<void>;
  update(realization: Realization): Promise<void>;
  delete(id: string): Promise<void>;
}