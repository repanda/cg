export type Realization = {
    id: string;
    department: string,
    activity: string,
    month: number,
    year: number,
    amount: number,
  };

  export const fakeData: Realization[] = [
    {
      id: '9s41rp',
      department: 'Logistique',
      activity: 'Achat',
      month: 12,
      year: 2023,
      amount: 30_000_000,
    }
  ];