import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { TableColumn, TableHeaderProps } from './types';

export default function TableHeader(props: TableHeaderProps) {
  const { onChangeSort, columns, order, sortField } = props;

  function handleOnClickSort(cell: TableColumn<any>) {
    if (onChangeSort && cell.sortable) {
      onChangeSort(cell.name);
    }
  }

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.name}
            align={headCell.align}
            padding="normal"
            sortDirection={sortField === headCell.name ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={sortField === headCell.name}
                direction={sortField === headCell.name ? order : 'asc'}
                onClick={() => handleOnClickSort(headCell)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <div>{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
