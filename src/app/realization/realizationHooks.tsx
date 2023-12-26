import {
    useMutation,
    useQueryClient,
  } from '@tanstack/react-query';
import { Realization, RealizationStatus, fakeData } from './makeData';
import { useQuery } from "@tanstack/react-query";

//CREATE hook (post new realization to api or database)
export function useCreateRealization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (realization: Realization) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newRealizationInfo: Realization) => {
      queryClient.setQueryData(
        ['realizations'],
        (prevRealizations: any) => [
          ...prevRealizations,
          {
            ...newRealizationInfo,
            id: (Math.random() + 1).toString(36).substring(7),
            department: 'Logistique',
            status: RealizationStatus.DRAFT
          },
        ] as Realization[]
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['realizations'] }), //refetch Realizations after mutation, disabled for demo
  });
}

//UPDATE hook (put Realization in api)
export function useUpdateRealization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (realization: Realization) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newRealizationInfo: Realization) => {
      queryClient.setQueryData(
        ['realizations'],
        (prevRealizations: any) => prevRealizations?.map((prevRealization: Realization) => prevRealization.id === newRealizationInfo.id ? newRealizationInfo : prevRealization
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
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (realizationId: string) => {
      queryClient.setQueryData(
        ['realizations'],
        (prevRealizations: any) => prevRealizations?.filter((realization: Realization) => realization.id !== realizationId)
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
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}

