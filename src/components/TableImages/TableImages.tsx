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

// interface Column {
//   id: 'id' | 'image_0' | 'image_1' | 'image_2';
//   label: string;
//   minWidth?: number;
//   align?: 'left' | 'center' | 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'id', label: 'Id', minWidth: 30 },
//   {
//     id: 'image_0',
//     label: 'Image_0',
//     minWidth: 100,
//     align: 'center',
//     format: (value: number) => value.toLocaleString('en-US'),
//   }, 
//   {
//     id: 'image_1',
//     label: 'Image_1',
//     minWidth: 100,
//     align: 'center',
//     format: (value: number) => value.toLocaleString('en-US'),
//   }, 
//   {
//     id: 'image_2',
//     label: 'Image_2',
//     minWidth: 100,
//     align: 'center',
//     format: (value: number) => value.toLocaleString('en-US'),
//   }
// ];

export default function TableImages(props: {images: ImageProps[], status: number[]}) {
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
      <TableContainer sx={{ maxHeight: '85vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align={'center'}
                style={{ minWidth: 50 }}
              >
                Id
              </TableCell>

              {images[0]["imageUrls"].map((url, colIndex) => (
                <TableCell
                  align={'center'}
                  style={{ minWidth: 100 }}
                  key={colIndex}
                >
                  {"Image_" +  colIndex}
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
                    <TableCell
                      align={'center'}
                    >
                      {row["id"]}
                    </TableCell>
                    {row["imageUrls"].map((url, colIndex) => (
                      <TableCell key={colIndex}
                        align={'center'}
                      >
                        <img src={url as string} style={{width: "50px", height: "50px"}} alt="img"/>
                        <p>
                          {props.status[(page * rowsPerPage + rowIndex) * row["imageUrls"].length + colIndex] === 1 && "Downloading"}
                          {props.status[(page * rowsPerPage + rowIndex) * row["imageUrls"].length + colIndex] === 2 && "Finished"}
                          {props.status[(page * rowsPerPage + rowIndex) * row["imageUrls"].length + colIndex] === 3 && "Failed"}
                          {props.status[(page * rowsPerPage + rowIndex) * row["imageUrls"].length + colIndex] !== 1 
                              && props.status[(page * rowsPerPage + rowIndex) * row["imageUrls"].length + colIndex] !== 2 
                              && props.status[(page * rowsPerPage + rowIndex) * row["imageUrls"].length + colIndex] !== 3 && "Queued"}                                  
                        </p>
                      </TableCell>
                    ))}
                   
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