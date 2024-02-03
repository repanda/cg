import {
  useMutation,
  useQuery, useQueryClient,
} from '@tanstack/react-query';
import ReportAggregateRepository from './reportAggregateRepository';
import { Report } from './reportModel';

const repository: ReportAggregateRepository = new ReportAggregateRepository();

//READ hook (get Realizations from api)
export function useGetReports() {
  return useQuery<Report[]>({
    queryKey: ['reports'],
    queryFn: async () => {      
      return repository.getLastReport();
    },
    refetchOnWindowFocus: false,
  });
}

export function useSendReport() {
  // to be done
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (report: Report) => {
      await repository.getLastReport();
    },
    //client side optimistic update
    onMutate: (newReportInfo: Report) => {
      queryClient.setQueryData(
        ['reports'],
        (prevReports: Report[]) => prevReports?.map((prevReport: Report) => prevReport.id === newReportInfo.id ? newReportInfo : prevReport
        )
      );
    },
    onError: (error) => {
      // Handle the error, e.g., show a notification
      console.error('Mutation error:', error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['reports'] }), //refetch Reports after mutation
  });
}

