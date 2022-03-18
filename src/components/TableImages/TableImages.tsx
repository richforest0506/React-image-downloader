import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {ImageProps} from '../../utils/types'
import './style.scss';

interface Column {
  id: 'id' | 'setId' | 'image_0' | 'image_1' | 'image_2' | 'createdAt';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 30 },
  { id: 'setId', label: 'SetId', minWidth: 50 },
  {
    id: 'image_0',
    label: 'Image_0',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  }, 
  {
    id: 'image_1',
    label: 'Image_1',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  }, 
  {
    id: 'image_2',
    label: 'Image_2',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  }, 
  {
    id: 'createdAt',
    label: 'CreatedAt',
    minWidth: 120,
    align: 'center',    
  }
];

export default function StickyHeadTable(props: {images: ImageProps[], status: number[]}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const images = props.images;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {images
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column, colIndex) => {

                        let value = row[column.id];
                        let statusId = (page * rowsPerPage + rowIndex) * 3 + colIndex - 2;
                        if (column.id === 'image_0' || column.id === 'image_1' || column.id === 'image_2') {
                          return (
                            <TableCell key={colIndex} align={column.align}>
                              <img src={value as string} style={{width: "50px", height: "50px"}} alt="img"/>
                              <p>
                                {props.status[statusId] === 1 && "Downloading"}
                                {props.status[statusId] === 2 && "Finished"}
                                {props.status[statusId] === 3 && "Failed"}
                                {props.status[statusId] !== 1 
                                    && props.status[statusId] !== 2 
                                    && props.status[statusId] !== 3 && "Queued"}                                  
                              </p>
                            </TableCell>
                          );
                        }
                        else {
                          return (
                            <TableCell key={colIndex} align={column.align}>
                              {column.format && typeof value === 'number'
                                  ? column.format(value) : value}
                            </TableCell>
                          );
                        }
                      }                     
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 50]}
        component="div"
        count={images.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}