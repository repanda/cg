import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useQuery } from "@tanstack/react-query";
import { generateUniqueId } from '../shared/utils';
import { ProvisionRepository } from './provisionRepository';
import { Provision } from './provisionModel';
import InMemoryProvisionRepository from './InMemoryProvisionRepository';

const repository: ProvisionRepository = new InMemoryProvisionRepository();

//CREATE hook (post new provision to api or database)
export function useCreateProvision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provision: Provision) => {
      // Set default values and Generate a random ID before calling the repository
      const randomId = generateUniqueId();
      const provisionWithId: Provision = {
        ...provision,
        id: randomId,
      };

      //send api update request here
      await repository.create(provisionWithId);
    },
    //client side optimistic update
    onMutate: (newProvisionInfo: Provision) => {
      queryClient.setQueryData(
        ['provisions'],
        (prevProvisions: Provision[] = []) => [
          ...prevProvisions,
          {
            ...newProvisionInfo
          },
        ]
      );
    },
    //refetch Provisions after mutation
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['provisions'] }),
  });
}

//UPDATE hook (put Provision in api)
export function useUpdateProvision() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (provision: Provision) => {
      //send api update request here
      await repository.update(provision);
    },
    //client side optimistic update
    onMutate: (newProvisionInfo: Provision) => {
      queryClient.setQueryData(
        ['provisions'],
        (prevProvisions: Provision[]) => prevProvisions?.map((prevProvision: Provision) => prevProvision.id === newProvisionInfo.id ? newProvisionInfo : prevProvision
        )
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['provisions'] }), //refetch Provisions after mutation
  });
}

//DELETE hook (delete Provision in api)
export function useDeleteProvision() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (provisionId: string) => {
      //send api update request here
      await repository.delete(provisionId);
    },
    //client side optimistic update
    onMutate: (provisionId: string) => {
      queryClient.setQueryData(
        ['provisions'],
        (prevProvisions: Provision[]) => prevProvisions.filter((provision) => provision.id !== provisionId)
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['provisions'] }), //refetch provisions after mutation
  });
}

//READ hook (get Provisions from api)
export function useGetProvisions() {
  return useQuery<Provision[]>({
    queryKey: ['provisions'],
    queryFn: async () => {
      return repository.getAll();
    },
    refetchOnWindowFocus: false,
  });
}

export function useSendProvision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provision: Provision) => {
      await repository.update(provision);
    },
    //client side optimistic update
    onMutate: (newProvisionInfo: Provision) => {
      queryClient.setQueryData(
        ['provisions'],
        (prevProvisions: Provision[]) => prevProvisions?.map((prevProvision: Provision) => prevProvision.id === newProvisionInfo.id ? newProvisionInfo : prevProvision
        )
      );
    },
    onError: (error) => {
      // Handle the error, e.g., show a notification
      console.error('Mutation error:', error.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['provisions'] }), //refetch Provisions after mutation
  });
}

