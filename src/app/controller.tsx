import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const fakeData = [
  { activity: 'Purchase', provision: 150, realization: 180, ecart: 30 , lastYearRealisation: 140},
  // Add more fake data as needed
];

const ControllerTable = () => {

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="Controller Table">
        <TableHead>
          <TableRow>
            <TableCell>Activity</TableCell>
            <TableCell align="right">last Year Realisation</TableCell>
            <TableCell align="right">Provision</TableCell>
            <TableCell align="right">Realization</TableCell>
            <TableCell align="right">Ecart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fakeData.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.activity}
              </TableCell>
              <TableCell align="right">{row.lastYearRealisation}</TableCell>
              <TableCell align="right">{row.provision}</TableCell>
              <TableCell align="right">{row.realization}</TableCell>
              <TableCell align="right">{row.ecart}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ControllerTable;
