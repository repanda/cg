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

export const fakeData: Realization[] = [
  {
    id: '9s41rp',
    department: Department.LOGISTIQUE,
    activity: 'Achat',
    month: 12,
    year: 2023,
    amount: 30_000_000,
    status: RealizationStatus.DRAFT,
  }
];