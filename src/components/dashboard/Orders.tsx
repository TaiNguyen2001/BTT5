import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { AdminsContext } from '../../context/adminContext';
import { State } from '../../context/type'

export default function Orders() {
  const context = React.useContext(AdminsContext)
  const getData = (state: State) => {
    const loggedAdmin = state.admins.find(admin => {
      return admin.isLogIn
    })
    return loggedAdmin?.orders
  }
  const rows = getData(context)

  return (
    <React.Fragment>
      <Title>Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.cardType.toUpperCase()} {row.cardNum}</TableCell>
              <TableCell align="right">{`$${row.saleAmount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
