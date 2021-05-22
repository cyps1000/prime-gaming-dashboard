import {
  MouseEventHandler,
  MouseEvent,
  ChangeEvent,
  CSSProperties,
} from "react";

import {
  TableCellProps,
  PaperProps,
  ToolbarProps,
  TableContainerProps,
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
} from "@material-ui/core";

/**
 * Defines the sort order type
 */
export type SortOrder = "asc" | "desc";

/**
 * Defines the plugin type
 */
export type Plugin =
  | "withCount"
  | "withAdd"
  | "withSearch"
  | "withPagination"
  | "withStats"
  | "withSort"
  | "withBulkDelete"
  | "resetSearch"
  | "resetFilters"
  | "addResult";

/**
 * Defines the table cell classes type
 */
export type TableCellClasses = TableCellProps["classes"];

/**
 * Defines the table row classes type
 */
export type TableRowClasses = TableRowProps["classes"];

/**
 * Defines the input event type
 */
export type InputEvent = HTMLTextAreaElement | HTMLInputElement;

/**
 * Defines the Select All Click function type
 */
export type SelectAllClick = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

/**
 * Defines the Select Row function type
 */
export type SelectRow = (event: React.MouseEvent<unknown>, key: string) => void;

/**
 * Defines the get display value function type
 */
export type GetDisplayValue = (
  column: TableColumnData,
  row: TableRowData,
  rowIndex: number
) => any;

/**
 * Defines the handle search function type
 */
export type HandleSearch = (event: ChangeEvent<InputEvent>) => void;

/**
 * Defines the change rows per page function type
 */
export type ChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => void;

/**
 * Defines the cell click function type
 */
export type CellClick =
  | (MouseEventHandler<HTMLTableHeaderCellElement> &
      MouseEventHandler<HTMLTableDataCellElement>)
  | undefined;

/**
 * Defines the table row data interface
 */
export interface TableRowData {
  [key: string]: any;
}

/**
 * Defines the table column data interface
 */
export interface TableColumnData {
  label?: string;
  rowKey: string | null;
  align?: TableCellProps["align"];
  displayCount?: (index: number) => number;
  style?: CSSProperties;
  sort?: boolean;
  searchField?: boolean;
  type?: "text" | "date" | "checkbox";
  plugin?: {
    name: Plugin;
    [key: string]: any;
  };
}

/**
 * Defines the material props interface
 */
export interface MaterialProps {
  paperProps?: PaperProps;
  toolbarProps?: ToolbarProps;
  tableContainerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  tableBodyProps?: TableBodyProps;
}

/**
 * Defines the table pagination props interface
 */
export interface TablePaginationProps {
  enabled: boolean;
  type: "automatic" | "manual";
  total?: number;
  rowsPerPageOptions?: number[];
  currentPage?: number;
  rowsPerPage: number;
  handlePageChange?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null
  ) => void;
  handleRowsPerChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => any;
}

/**
 * Defines the component props's interface
 */
export interface DynamicTableProps {
  loading?: boolean;
  config: {
    columns: TableColumnData[];
    rows: TableRowData[];
    plugins?: Plugin[];
    onAdd?: MouseEventHandler<HTMLButtonElement> | undefined;
    onBulkDelete?: (data: TableRowData[]) => void;
    selectKey?: string;
    excludeSelectKeys?: string[];
    orderBy: string;
    order: SortOrder;
    dateFormat?: string;
    loadingComponent?: JSX.Element;
    notFoundComponent?: JSX.Element;
    pagination?: TablePaginationProps;
    materialProps?: MaterialProps;
  };
  classes: {
    table: string;
    tableCell: TableCellProps["classes"];
    tableRow: TableRowProps["classes"];
  };
}

/**
 * Defines the Table Body Props
 */
export interface DynamicTableBodyProps {
  loading?: boolean;
  searchFailed: boolean;
  selected: string[];
  selectKey?: string;
  excludeSelectKeys?: string[];
  rows: TableRowData[];
  columns: TableColumnData[];
  plugins?: Plugin[];
  loadingComponent?: JSX.Element;
  notFoundComponent?: JSX.Element;
  tableCellClasses: TableCellProps["classes"];
  tableRowClasses: TableRowProps["classes"];
  getDisplayValue: GetDisplayValue;
  handleSelectRow: (event: React.MouseEvent<unknown>, key: string) => void;
}

/**
 * Defines the Table Head Props
 */
export interface DynamicTableHeadProps {
  columns: TableColumnData[];
  rows: TableRowData[];
  orderBy: string;
  order: SortOrder;
  plugins?: Plugin[];
  handleSort: (property: TableColumnData["rowKey"]) => any;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => any;
  selected: string[];
  tableCellClasses: TableCellProps["classes"];
  tableRowClasses: TableRowProps["classes"];
}

/**
 * Defines the Table Toolbar Props
 */
export interface DynamicTableToolbarProps {
  search: string;
  searchReady: boolean;
  handleSearch: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleResetSearch: () => void;
  searchLoading: boolean;
  loading?: boolean;
  rows: TableRowData[];
  columns: TableColumnData[];
  toolbarProps?: ToolbarProps;
  selected: string[];
  handleBulkDelete: () => void;
  onAdd?: MouseEventHandler<HTMLButtonElement> | undefined;
  plugins?: Plugin[];
}

/**
 * Defines the Table Pagination Props
 */
export interface DynamicTablePaginationProps {
  tableProps?: TableProps;
  tableBodyProps?: TableBodyProps;
  pagination?: TablePaginationProps;
  tableRowClasses: TableRowProps["classes"];
  tableClasses: string;
  rows: TableRowData[];
  columns: TableColumnData[];
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
