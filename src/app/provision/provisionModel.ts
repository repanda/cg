import { Department } from "../shared/models";

export type Provision = {
    id: string;
    department: Department;
    month: number;
    year: number;
    amount: number;
};
  