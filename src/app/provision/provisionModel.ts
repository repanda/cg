import { Department } from "../shared/models";

export type Provision = {
    id: string;
    department: Department;
    year: number;
    amount: number;
};
  
export const departments = [
    'Logistique',
    'TCO'
]