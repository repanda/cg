import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const fakeData = [
  { department: 'Logistique', month: 3 , year: 2023, activity: 'Purchase', realization: 180},
];

const ManagerTable = () => {

  return (
    <>
      <div>Manager Table</div>
      <TableContainer component={Paper}>
        <Table  aria-label="Manager Table">
          <TableHead>
            <TableRow>
              <TableCell>department</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell align="right">Annee</TableCell>
              <TableCell align="right">Mois</TableCell>
              <TableCell align="right">Realisation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.department}
                </TableCell>
                <TableCell align="right">{row.activity}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.month}</TableCell>
                <TableCell align="right">{row.realization}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManagerTable;
