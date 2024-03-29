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

  async getLastReport(): Promise<Report[]> {
    const monthlyReports = Object.values(Department).map(async (departmentKey) => {
      try {
        const year = 2024;
        const month = 2;
    
        // Call your repository with the current department key, year, and month
        const provision = await provisionRepository.getProvisionForDepartmentAndMonth(departmentKey, year);
        const realization = await realizationRepository.getRealizationForDepartmentAndMonth(departmentKey, year, month);
        const previousYearRealization = await realizationRepository.getRealizationForDepartmentAndMonth(departmentKey, year-1, month);

        const provisionAmount = executeSafely(()=> provision!.amount / 12);
        const realizationAmount = realization?.amount;
        const previousRealizationAmout = previousYearRealization?.amount;

        // Create the report object
        const report: Report = {
          id: 'TBD',
          previousYearRealization: previousRealizationAmout,
          year,
          month,
          department: Department[departmentKey as keyof typeof Department], // Convert key to enum label
          provision: provisionAmount,
          realization: realizationAmount,
          ecart: executeSafely(()=> provisionAmount - realizationAmount!) ,
          frequency: realizationAmount !== 0 ? provisionAmount / realizationAmount! : 0,
          ecartEvolution: executeSafely(()=> previousRealizationAmout! - realizationAmount!) ,
          frequencyEvolution: realizationAmount !== 0 ? previousRealizationAmout! / realizationAmount! : 0,
        };
    
        return report;
      } catch (error) {
        console.error(`Error fetching report for ${departmentKey}:`, error);
        return [];
      }
    });
    
    // Use Promise.all to wait for all promises to resolve
    const allReports: Report[] = await Promise.all(monthlyReports.filter(Boolean));
    
    // Now allReports contains an array of reports for each department
    return allReports;
  }
}

function executeSafely(func: any) {
  try {
    return func();
  } catch (error) {
    // Log the error if needed
    console.warn('Warn:', error);
    return undefined;
  }
}

export default ReportAggregateRepository;
