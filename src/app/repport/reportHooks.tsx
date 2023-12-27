import {
  useQuery,
} from '@tanstack/react-query';
import ReportAggregateRepository from './reportAggregateRepository';
import { Report } from './reportModel';

const reportAggregateRepository: ReportAggregateRepository = new ReportAggregateRepository();

//READ hook (get Realizations from api)
export function useGetMonthlyReport() {
  return useQuery<Report>({
    queryKey: ['report'],
    // queryFn: async () => {      
    //   return reportAggregateRepository.getLastReport();
    // },
    refetchOnWindowFocus: false,
  });
}

export function useSendReport() {
  // to be done
}

