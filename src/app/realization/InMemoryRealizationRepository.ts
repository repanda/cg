// inMemoryRealizationRepository.ts
import { Realization, RealizationStatus } from './makeData';
import { Department } from "../shared/models";
import { RealizationRepository } from './realizationRepository';

class InMemoryRealizationRepository implements RealizationRepository {
 // private realizations: Realization[] = [];
  private realizations: Realization[] = [
    {
      id: 'lqmu3vo7-hbpnah',
      activity: 'Achat',
      month: 12,
      year: 2023,
      amount: 30_000_000,
      department: Department.LOGISTIQUE,
      status: RealizationStatus.DRAFT,
    },
    {
      id: 'lqmu3vo6-hbpnah',
      activity: 'Achat',
      month: 11,
      year: 2023,
      amount: 10_000_000,
      department: Department.LOGISTIQUE,
      status: RealizationStatus.TO_BE_CONTROLLED,
    },
    {
      id: 'lqmu3vo5-hbpnah',
      activity: 'Achat',
      month: 10,
      year: 2023,
      amount: 15_000_000,
      department: Department.LOGISTIQUE,
      status: RealizationStatus.CONTROLLED,
    },
    // Add more fake data as needed
  ];

  async getAll(): Promise<Realization[]> {
    return this.realizations;
  }

  async getById(id: string): Promise<Realization | undefined> {
    return this.realizations.find((realization) => realization.id === id);
  }

  async create(realization: Realization): Promise<void> {
    console.log('create', realization);
    this.realizations.push(realization);
  }

  async update(updatedRealization: Realization): Promise<void> {
    console.log('update', updatedRealization);

    const index = this.realizations.findIndex((r) => r.id === updatedRealization.id);

    if (index !== -1) {
      this.realizations[index] = updatedRealization;
    }
  }

  async delete(id: string): Promise<void> {
    console.log('delete', id, this.realizations);
    this.realizations = this.realizations.filter((realization) => realization.id !== id);
  }
}

export default InMemoryRealizationRepository;
