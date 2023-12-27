import InMemoryProvisionRepository from "../provision/InMemoryProvisionRepository";
import { ProvisionRepository } from "../provision/provisionRepository";
import InMemoryRealizationRepository from "../realization/InMemoryRealizationRepository";
import { RealizationRepository } from "../realization/realizationRepository";
import { ReportRepository } from "./reportRepository";
import { Report } from './reportModel';

const provisionRepository: ProvisionRepository = new InMemoryProvisionRepository();
const realizationRepository: RealizationRepository= new InMemoryRealizationRepository();

class ReportAggregateRepository implements ReportRepository {

  async getLastReport(): Promise<Report | undefined> {
    const year = 2023;
      const month = 12;

      const realizations = await realizationRepository.getAll();
      const provisions = await provisionRepository.getAll();
      
      const report: Report = {
        id: 'to be done',
        year,
        month,
        realizations,
        provisions
      }

    return report;
  }
}

export default ReportAggregateRepository;
