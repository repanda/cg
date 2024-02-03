// inspired from https://www.material-react-table.com/docs/examples/editing-crud-inline-row
'use client'
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import { Report } from './reportModel';
import { useGetReports, useSendReport } from './reportHooks';

const Reports = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Report>[]>(
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
      },
      {
        accessorKey: 'year',
        header: 'Annee',
      }
    ],
    [validationErrors],
  );

  //call READ hook
  const {
    data: fetchedReports = [],
    isError: isLoadingReportsError,
    isFetching: isFetchingReports,
    isLoading: isLoadingReports,
  } = useGetReports();
  //call SEND hook
  const { mutateAsync: sendReport, isPending: isSendingReport } = useSendReport();

  // Function to handle the button click
  const handleSendReport = (row: MRT_Row<Report>) => {
    setValidationErrors({});
    sendReport(row.original);
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedReports,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingReportsError
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
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Modifier">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(
            createRow(table)
          );
        }}
      >
        Creer une nouvelle prévision
      </Button>
    ),
    state: {
      isLoading: isLoadingReports,
      isSaving: isSendingReport,
      showAlertBanner: isLoadingReportsError,
      showProgressBars: isFetchingReports,
    },
  });

  return <MaterialReactTable table={table} />;
};

const queryClient = new QueryClient();

const RapportProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Reports />
  </QueryClientProvider>
);

export default RapportProviders;
