import { Provision } from "./provisionModel";

export interface ProvisionRepository {
  getAll(): Promise<Provision[]>;
  getById(id: string): Promise<Provision | undefined>;
  create(provision: Provision): Promise<void>;
  update(provision: Provision): Promise<void>;
  delete(id: string): Promise<void>;
}