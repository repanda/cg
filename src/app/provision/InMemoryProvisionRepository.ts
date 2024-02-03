// inMemoryRealizationRepository.ts
import { Department } from "../shared/models";
import { Provision } from "./provisionModel";
import { ProvisionRepository } from "./provisionRepository";

class InMemoryProvisionRepository implements ProvisionRepository {
 // private provisions: Provision[] = [];
  private provisions: Provision[] = [
    {
      id: '12mu3vo7-hbpnah',
      year: 2023,
      amount: 3_000,
      department: Department.LOGISTIQUE,
    },
    {
      id: '11mu3vo6-hbpnah',
      year: 2023,
      amount: 10_000_000,
      department: Department.LOGISTIQUE,
    },
    {
      id: '10mu3vo5-hbpnah',
      year: 2023,
      amount: 15_000_000,
      department: Department.LOGISTIQUE,
    },
    // Add more fake data as needed
  ];

  async getAll(): Promise<Provision[]> {
    return this.provisions;
  }

  async getById(id: string): Promise<Provision | undefined> {
    return this.provisions.find((provision) => provision.id === id);
  }

  async create(provision: Provision): Promise<void> {
    console.log('create', provision);
    this.provisions.push(provision);
  }

  async update(updatedProvision: Provision): Promise<void> {
    console.log('update', updatedProvision);

    const index = this.provisions.findIndex((r) => r.id === updatedProvision.id);

    if (index !== -1) {
      this.provisions[index] = updatedProvision;
    }
  }

  async delete(id: string): Promise<void> {
    console.log('delete', id, this.provisions);
    this.provisions = this.provisions.filter((provision) => provision.id !== id);
  }
}

export default InMemoryProvisionRepository;
