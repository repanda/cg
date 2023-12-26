export enum RealizationStatus {
  DRAFT = 'BROUILLON',
  TO_BE_CONTROLLED = 'TO_BE_CONTROLLED',
  CONTROLLED = 'CONTROLLED',
}

export enum Department {
  LOGISTIQUE = 'Logistique',
}

export type Realization = {
  id: string;
  department: Department;
  activity: string;
  month: number;
  year: number;
  amount: number;
  status: RealizationStatus;
};

export const DRAFT_REALAZATION = {
  department: Department.LOGISTIQUE,
  status: RealizationStatus.DRAFT,
} as Realization;