import { Department } from "../shared/models";

export type Report = {
    id: string;
    year: number;
    month: number;
    department: Department;
    previousYearRealization: number | undefined;
    provision: number | undefined;
    realization: number | undefined;
    ecart: number | undefined;
    frequency: number | undefined;
}