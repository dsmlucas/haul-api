import { JSX } from 'react';

interface TableProps extends TableHeaderProps, TableToolbarProps {
  fetchData?: (
    pageIndex: number,
    pageSize: number,
    order?: string,
    orderBy?: string,
  ) => void;
  rows: any[];
  rowCount: number;
  loading?: boolean;
  onRowClick?: (row: never) => void;
  hidePagination?: boolean;
}

interface TableHeaderProps {
  columns: TableColumn<any>[];
  onChangeSort?: (field: string) => void;
  order?: Order;
  sortField?: string;
  toolbarItems?: JSX.Element;
}

interface TableColumn<T> {
  name: string;
  label: string;
  value: (row: T) => number | string;
  sortable?: boolean;
  align?: 'center' | 'left' | 'right';
  minWidth?: number | string;
}

interface TableToolbarProps {
  items?: JSX.Element;
}

type Order = 'asc' | 'desc';

export type {
  Order,
  TableColumn,
  TableHeaderProps,
  TableProps,
  TableToolbarProps,
};
