// inspired from https://www.material-react-table.com/docs/examples/editing-crud-inline-row
'use client'
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  createRow,
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
import { departments, type Provision } from './provisionModel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/SendRounded';
import { useCreateProvision, useDeleteProvision, useGetProvisions, useSendProvision, useUpdateProvision } from './provisionHooks';

const Provisions = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Provision>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'department',
        header: 'Departement',
        editVariant: 'select',
        editSelectOptions: departments,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
        }
      },
      {
        accessorKey: 'year',
        header: 'Annee',
      },
      {
        accessorKey: 'amount',
        header: 'Montant alloué',
      }
    ],
    [validationErrors],
  );

  //call CREATE hook
  const { mutateAsync: createProvision, isPending: isCreatingProvision } = useCreateProvision();

  //call READ hook
  const {
    data: fetchedProvisions = [],
    isError: isLoadingProvisionsError,
    isFetching: isFetchingProvisions,
    isLoading: isLoadingProvisions,
  } = useGetProvisions();
  //call UPDATE hook
  const { mutateAsync: updateProvision, isPending: isUpdatingProvision } = useUpdateProvision();
  //call DELETE hook
  const { mutateAsync: deleteProvision, isPending: isDeletingProvision } = useDeleteProvision();
  //call SEND hook
  const { mutateAsync: sendProvision, isPending: isSendingProvision } = useSendProvision();

  //CREATE action
  const handleCreateProvision: MRT_TableOptions<Provision>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    setValidationErrors({});
    await createProvision(values);
    table.setCreatingRow(null); //exit creating mode
  };

  //UPDATE action
  const handleSaveProvision: MRT_TableOptions<Provision>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    setValidationErrors({});
    await updateProvision(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<Provision>) => {
    if (window.confirm('Are you sure you want to delete this provision?')) {
      deleteProvision(row.original.id);
    }
  };

  // Function to handle the button click
  const handleSendProvision = (row: MRT_Row<Provision>) => {
    setValidationErrors({});
    sendProvision(row.original);
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedProvisions,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingProvisionsError
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
    onCreatingRowSave: handleCreateProvision,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveProvision,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Envoyer">
          <IconButton onClick={() => handleSendProvision(row)}>
            <SendIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Modifier">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
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
          table.setCreatingRow( // Set default value for status to DRAFT
            createRow(table)
          );
        }}
      >
        Creer une nouvelle prévision
      </Button>
    ),
    state: {
      isLoading: isLoadingProvisions,
      isSaving: isCreatingProvision || isUpdatingProvision || isDeletingProvision || isSendingProvision,
      showAlertBanner: isLoadingProvisionsError,
      showProgressBars: isFetchingProvisions,
    },
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const ProvisionProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Provisions />
  </QueryClientProvider>
);

export default ProvisionProviders;
