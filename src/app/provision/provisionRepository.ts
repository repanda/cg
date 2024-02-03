import { Department } from "../shared/models";
import { Provision } from "./provisionModel";

export interface ProvisionRepository {
  getProvisionForDepartmentAndMonth(departmentKey: Department, year: number): Promise<Provision | undefined>;
  getAll(): Promise<Provision[]>;
  getById(id: string): Promise<Provision | undefined>;
  create(provision: Provision): Promise<void>;
  update(provision: Provision): Promise<void>;
  delete(id: string): Promise<void>;
}