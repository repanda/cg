import { Department } from "../shared/models";

export type Report = {
    id: string;
    year: number;
    month: number;
    department: Department;
    provision: number;
    realization: number;
    ecart: number;
}