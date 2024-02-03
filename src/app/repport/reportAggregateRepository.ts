import InMemoryProvisionRepository from "../provision/InMemoryProvisionRepository";
import { ProvisionRepository } from "../provision/provisionRepository";
import InMemoryRealizationRepository from "../realization/InMemoryRealizationRepository";
import { RealizationRepository } from "../realization/realizationRepository";
import { ReportRepository } from "./reportRepository";
import { Report } from './reportModel';
import { Department } from "../shared/models";

const provisionRepository: ProvisionRepository = new InMemoryProvisionRepository();
const realizationRepository: RealizationRepository= new InMemoryRealizationRepository();

class ReportAggregateRepository implements ReportRepository {

  private reports: Report[] = [
    {
      id: 'TBD',
      year: 2024,
      month: 3,
      department: Department.LOGISTIQUE,
      provision: 100,
      realization: 200,
      ecart: 100,
      frequency: 100,
    }
  ]

  async getLastReport(): Promise<Report[]> {
    const year = 2023;
      const month = 12;

      const realizations = await realizationRepository.getAll();
      const provisions = await provisionRepository.getAll();
      
      const provision = provisions[0].amount;
      const realization = realizations[0].amount;
      const report: Report = {
        id: 'TBD',
        year: 2024,
        month: 3,
        department: Department.LOGISTIQUE,
        provision,
        realization,
        ecart: provision - realization,
        frequency: provision / realization,
      }

    return [report];
  }
}

export default ReportAggregateRepository;
