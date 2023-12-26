// inMemoryRealizationRepository.ts
import { Realization, RealizationStatus } from './makeData';
import { RealizationRepository } from './realizationRepository';

class InMemoryRealizationRepository implements RealizationRepository {
  private realizations: Realization[] = [];

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
