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
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/SendRounded';
import { Report } from './reportModel';
import { useGetReports, useSendReport } from './reportHooks';

const Reports = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: 'department',
        header: 'Departement',
      },
      {
        accessorKey: 'previousYearRealization',
        header: 'Réalization anneé précédente',
      },
      {
        accessorKey: 'provision',
        header: 'Prévision',
      },
      {
        accessorKey: 'realization',
        header: 'Réalization',
      },
      {
        accessorKey: 'ecart',
        header: 'Ecart',
      },
      {
        accessorKey: 'frequency',
        header: 'Fréquence %',
        size: 200,
            Cell: ({ cell }) => (
              <div>
                {cell.getValue<number>()?.toLocaleString?.('dzd', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </div>
            )
      },
      {
        accessorKey: 'ecartEvolution',
        header: 'Ecart anneé précédente',
      },
      {
        accessorKey: 'frequencyEvolution',
        header: 'Fréquence anneé précédente %',
        size: 200,
            Cell: ({ cell }) => (
              <div>
                {cell.getValue<number>()?.toLocaleString?.('dzd', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </div>
            )
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

const sumPreviousYearRealization = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.previousYearRealization || 0), 0),
  [fetchedReports]
);

const sumProvision = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.provision || 0), 0),
  [fetchedReports]
);

const sumRealization = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.realization || 0), 0),
  [fetchedReports]
);

const sumEcart = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.ecart || 0), 0),
  [fetchedReports]
);

const sumFrequency = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.frequency || 0), 0),
  [fetchedReports]
);

const sumEcartEvolution = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.ecartEvolution || 0), 0),
  [fetchedReports]
);

const sumFrequencyEvolution = useMemo(
  () => fetchedReports.reduce((acc, curr) => acc + (curr.frequencyEvolution || 0), 0),
  [fetchedReports]
);



// Add more sum calculations for other columns if needed

const columnsWithFooter = useMemo(() => {
  const columnsWithFooter = [...columns];

  // Add a footer to each column with a sum calculation
  columnsWithFooter.forEach((column) => {
    if (column.accessorKey === 'previousYearRealization') {
      column.footer = sumPreviousYearRealization.toLocaleString('dzd');
    } else if (column.accessorKey === 'provision') {
      column.footer = sumProvision.toLocaleString('dzd');
    } else if (column.accessorKey === 'realization') {
      column.footer = sumRealization.toLocaleString('dzd');
    } else if (column.accessorKey === 'ecart') {
      column.footer = sumEcart.toLocaleString('dzd');
    } else if (column.accessorKey === 'frequency') {
      column.footer = sumFrequency.toLocaleString?.('dzd', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    } else if (column.accessorKey === 'ecartEvolution') {
      column.footer = sumEcartEvolution.toLocaleString('dzd');
    } else if (column.accessorKey === 'frequencyEvolution') {
      column.footer = sumFrequencyEvolution.toLocaleString?.('dzd', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    }
    // Add more conditions for other columns if needed
  });

  return columnsWithFooter;
}, [columns, sumPreviousYearRealization, sumProvision, sumRealization, sumEcart]);

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
            <IconButton onClick={() => handleSendReport(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="outlined"
        onClick={() => {
          table.setCreatingRow(
            createRow(table)
          );
        }}
      >
        Envoyer le repport mensuel
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
