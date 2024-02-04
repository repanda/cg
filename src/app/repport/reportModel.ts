import { Department } from "../shared/models";

export type Report = {
    id: string;
    year: number;
    month: number;
    department: Department;
    provision: number | undefined;
    realization: number | undefined;
    ecart: number | undefined;
    frequency: number | undefined;
    previousYearRealization: number | undefined;
    ecartEvolution: number | undefined;
    frequencyEvolution: number | undefined;
}