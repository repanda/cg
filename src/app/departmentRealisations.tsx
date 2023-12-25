// inspired from https://www.material-react-table.com/docs/examples/editing-crud-inline-row
'use client'
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { type Realization } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateRealization, useDeleteRealization, useGetRealizations, useUpdateRealization } from './realizationHooks';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Realization>[]>(
    () => [
      {
        accessorKey: 'department',
        header: 'Departement',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'activity',
        header: 'Activitee',
      },
      {
        accessorKey: 'month',
        header: 'Mois',
      },
      {
        accessorKey: 'year',
        header: 'Annee',
      },
      {
        accessorKey: 'amount',
        header: 'Montant declare',
      },
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createRealization, isPending: isCreatingRealization } = useCreateRealization();

  //call READ hook
  const {
    data: fetchedRealizations = [],
    isError: isLoadingRealizarionsError,
    isFetching: isFetchingRealizations,
    isLoading: isLoadingRealizations,
  } = useGetRealizations();
  //call UPDATE hook
  const { mutateAsync: updateRealization, isPending: isUpdatingRealization } = useUpdateRealization();
  //call DELETE hook
  const { mutateAsync: deleteRealization, isPending: isDeletingRealization } = useDeleteRealization();

  //CREATE action
  const handleCreateRealization: MRT_TableOptions<Realization>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    setValidationErrors({});
    await createRealization(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveRealization: MRT_TableOptions<Realization>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    setValidationErrors({});
    await updateRealization(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Realization>) => {
    if (window.confirm('Are you sure you want to delete this realization?')) {
      deleteRealization(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedRealizations,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingRealizarionsError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateRealization,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveRealization,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Creer une nouvelle realisation
      </Button>
    ),
    state: {
      isLoading: isLoadingRealizations,
      isSaving: isCreatingRealization || isUpdatingRealization || isDeletingRealization,
      showAlertBanner: isLoadingRealizarionsError,
      showProgressBars: isFetchingRealizations,
    },
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithProviders;