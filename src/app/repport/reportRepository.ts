import { Report } from './reportModel';

export interface ReportRepository {
  getLastReport(): Promise<Report | undefined>;
}