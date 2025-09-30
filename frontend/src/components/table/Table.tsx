import * as React from 'react';

import Box from '@mui/material/Box';
import MTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Order, TableProps } from './types';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import { LinearProgress, SxProps } from '@mui/material';

const paperStyle: SxProps = {
  width: '100%',
  mb: 2,
  boxShadow: 'none',
  backgroundColor: 'var(--base-bg-color-2)',
  borderRadius: '8px',
};

export default function Table(props: TableProps) {
  const {
    columns,
    rows,
    rowCount,
    fetchData,
    loading,
    onRowClick,
    hidePagination,
  } = props;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>();

  const [page, setPage] = React.useState(0);
  const [pageSize, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    if (fetchData) {
      fetchData(page + 1, pageSize, order.toUpperCase(), orderBy);
    }
  }, [fetchData, page, pageSize, order, orderBy]);

  const onChangeSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={paperStyle}>
        {props.toolbarItems && <TableToolbar items={props.toolbarItems} />}

        <TableContainer>
          {loading && <LinearProgress />}

          <MTable
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHeader
              columns={columns}
              order={order}
              sortField={orderBy}
              onChangeSort={onChangeSort}
            />

            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover={onRowClick ? true : false}
                  tabIndex={-1}
                  key={`${row.id}-${index}`}
                  onClick={() => onRowClick?.(row as never)}
                  sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.name}
                      align={column.align || 'left'}
                      width={column.minWidth}
                      className="custom-table-cell"
                    >
                      {column.value(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow style={{ height: 53 }}>
                  <TableCell colSpan={6} align="center">
                    No record found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MTable>
        </TableContainer>

        {!hidePagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rowCount}
            rowsPerPage={pageSize}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            className="table-pagination-footer"
          />
        )}
      </Paper>
    </Box>
  );
}
