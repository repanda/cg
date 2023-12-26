import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Department, Realization, RealizationStatus } from './makeData';
import { useQuery } from "@tanstack/react-query";
import { RealizationRepository } from './realizationRepository';
import InMemoryRealizationRepository from './InMemoryRealizationRepository';

const repository: RealizationRepository = new InMemoryRealizationRepository();

// Function to generate a simple unique ID
function generateUniqueId() {
  const timestamp = new Date().getTime().toString(36);
  const randomPart = Math.random().toString(36).substring(7);
  return `${timestamp}-${randomPart}`;
}

//CREATE hook (post new realization to api or database)
export function useCreateRealization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (realization: Realization) => {
      // Set default values and Generate a random ID before calling the repository
      const randomId = generateUniqueId();
      const realizationWithId: Realization = {
        ...realization,
        id: randomId,
        department: Department.LOGISTIQUE,
        status: RealizationStatus.DRAFT,
      };

      //send api update request here
      await repository.create(realizationWithId);
    },
    //client side optimistic update
    onMutate: (newRealizationInfo: Realization) => {
      queryClient.setQueryData(
        ['realizations'],
        (prevRealizations: Realization[] = []) => [
          ...prevRealizations,
          {
            ...newRealizationInfo
          },
        ]
      );
    },
    //refetch Realizations after mutation
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['realizations'] }),
  });
}

//UPDATE hook (put Realization in api)
export function useUpdateRealization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (realization: Realization) => {
      //send api update request here
      await repository.update(realization);
    },
    //client side optimistic update
    onMutate: (newRealizationInfo: Realization) => {
      queryClient.setQueryData(
        ['realizations'],
        (prevRealizations: Realization[]) => prevRealizations?.map((prevRealization: Realization) => prevRealization.id === newRealizationInfo.id ? newRealizationInfo : prevRealization
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['realizations'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete Realization in api)
export function useDeleteRealization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (realizationId: string) => {
      //send api update request here
      await repository.delete(realizationId);
    },
    //client side optimistic update
    onMutate: (realizationId: string) => {
      queryClient.setQueryData(
        ['realizations'],
        (prevRealizations: Realization[]) => prevRealizations.filter((realization) => realization.id !== realizationId)
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['realizations'] }), //refetch realizations after mutation, disabled for demo
  });
}

//READ hook (get users from api)
export function useGetRealizations() {
  return useQuery<Realization[]>({
    queryKey: ['realizations'],
    queryFn: async () => {
      return repository.getAll();
    },
    refetchOnWindowFocus: false,
  });
}
