import {
  useState,
  useEffect,
  MouseEventHandler,
  MouseEvent,
  ChangeEvent,
  Fragment,
} from "react";

/**
 * External Imports
 */
import "date-fns";
import clsx from "clsx";
import shortid from "shortid";
import { format as formatDate } from "date-fns";

/**
 * Imports the component styles
 */
import { useStyles } from "./DynamicTable.styles";

/**
 * Imports Material UI components
 */
import Table, { TableProps } from "@material-ui/core/Table";
import TableBody, { TableBodyProps } from "@material-ui/core/TableBody";
import TableCell, { TableCellProps } from "@material-ui/core/TableCell";
import TableContainer, {
  TableContainerProps,
} from "@material-ui/core/TableContainer";
import TableHead, { TableHeadProps } from "@material-ui/core/TableHead";
import TableRow, { TableRowProps } from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import Toolbar, { ToolbarProps } from "@material-ui/core/Toolbar";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import InpuText from "../InputText";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";
import Pagination from "@material-ui/lab/Pagination";

/**
 * Defines the Order Type
 */
export type SortOrder = "asc" | "desc";

/**
 * Defines the table row data
 */
export interface TableRowData {
  [key: string]: any;
}

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
 * Defines the table column data
 */
export interface TableColumnData {
  isCounter?: boolean;
  label?: string;
  rowKey: string | null;
  skipKey?: boolean;
  align?: TableCellProps["align"];
  displayCount?: (index: number) => number;
  sort?: boolean;
  addedByPlugin?: boolean;
  searchField?: boolean;
  type?: "text" | "date" | "checkbox";
}

export interface MaterialProps {
  paperProps?: PaperProps;
  toolbarProps?: ToolbarProps;
  tableContainerProps?: TableContainerProps;
  tableProps?: TableProps;
  tableHeadProps?: TableHeadProps;
  tableBodyProps?: TableBodyProps;
}

export interface TablePaginationProps {
  enabled: boolean;
  type: "automatic" | "manual";
  total?: number;
  rowsPerPageOptions: number[];
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
 * Defines the props interface
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
    excluseSelectKeys?: string[];
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
 * Displays the component
 */
export const DynamicTable: React.FC<DynamicTableProps> = (props) => {
  const { loading, config, classes } = props;

  const {
    rows,
    columns,
    onAdd,
    onBulkDelete,
    selectKey,
    excluseSelectKeys,
    materialProps = {},
    plugins,
    loadingComponent,
    notFoundComponent,
    pagination,
    dateFormat,
  } = config;

  const {
    paperProps,
    toolbarProps,
    tableContainerProps,
    tableProps,
    tableHeadProps,
    tableBodyProps,
  } = materialProps;

  /**
   * Gets the component styles
   */
  const baseClasses = useStyles();

  /**
   * Initializes the order (asc/desc)
   */
  const [order, setOrder] = useState(config.order);

  /**
   * Initializes the order by field
   */
  const [orderBy, setOrderBy] = useState(config.orderBy);

  /**
   * Initializes the table headers
   */
  const [tableHeaders, setTableHeaders] = useState<typeof columns>([]);

  /**
   * Initializes collection
   */
  const [collection, setCollection] = useState<typeof rows>([]);

  const [search, setSearch] = useState("");

  /**
   * Initializes the search loading state
   */
  const [searchLoading, setSearchLoading] = useState(false);

  /**
   * Initializes the search failed flag
   */
  const [searchFailed, setSearchFailed] = useState(false);

  /**
   * Initializes the inputs ready flag
   * Used to debounce all inputs, updating the inputs object, used in the onSubmit function
   */
  const [searchReady, setSearchReady] = useState(false);

  const [selected, setSelected] = useState<string[]>([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(
    pagination?.rowsPerPage ? pagination.rowsPerPage : 10
  );

  /**
   * Defines the table cell classes
   */
  const tableCellClasses: TableCellProps["classes"] = {
    head: classes.tableCell?.head,
    body: classes.tableCell?.body,
  };

  const tableRowClasses: TableRowProps["classes"] = {
    root: classes.tableRow?.root,
  };

  /**
   * Defines the comparator
   */
  const descendingComparator = (
    a: TableRowData,
    b: TableRowData,
    orderBy: string
  ) => {
    const orderByData = columns.find((column) => column.rowKey === orderBy);

    if (orderByData && orderByData.type === "date") {
      if (new Date(b[orderBy]).getTime() < new Date(a[orderBy]).getTime())
        return -1;
      if (new Date(b[orderBy]).getTime() > new Date(a[orderBy]).getTime())
        return 1;
      return 0;
    }

    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  };

  /**
   * Handles getting the comparator
   */
  const getComparator: (order: SortOrder, orderBy: string) => any = (
    order,
    orderBy
  ) => {
    return order === "desc"
      ? (a: TableRowData, b: TableRowData) =>
          descendingComparator(a, b, orderBy)
      : (a: TableRowData, b: TableRowData) =>
          -descendingComparator(a, b, orderBy);
  };

  /**
   * Handles sorting the array
   */
  const stableSort: (
    array: TableRowData[],
    comparator: (order: SortOrder, orderBy: string) => any
  ) => TableRowData[] = (array, comparator) => {
    /**
     * Formats the array
     */
    const formattedArray = array.map((el, index) => [el, index]);

    /**
     * Sorts the array
     */
    formattedArray.sort((a: TableRowData, b: TableRowData) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    /**
     * Returns the newly sorted array
     */
    return formattedArray.map((el: TableRowData) => el[0]);
  };

  /**
   * Handles getting the table data
   * Also makes sure to sort it
   */
  const prepareTableCollection = (collection: TableRowData[]) => {
    if (columns && columns.length > 0 && collection && collection.length > 0) {
      if (pagination?.enabled && pagination.type === "automatic") {
        if (!(page + 1) || !rowsPerPage)
          return stableSort(collection, getComparator(order, orderBy));

        return stableSort(collection, getComparator(order, orderBy)).slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        );
      }

      return stableSort(collection, getComparator(order, orderBy));
    }
    return [];
  };

  /**
   * Handles updating the sorting related states
   */
  const handleSort = (property: TableColumnData["rowKey"]) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    if (property) setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && selectKey) {
      const newSelecteds = collection.map((item) => item[selectKey]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectRow = (event: React.MouseEvent<unknown>, key: string) => {
    const selectedIndex = selected.indexOf(key);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const renderTableHead = () => {
    return tableHeaders.map((column) => {
      const { label, rowKey, sort, type, addedByPlugin } = column;
      const active = orderBy === rowKey;
      const sortDirection = active ? order : false;
      const isSortCell = sort && plugins?.includes("withSort");
      const direction = active ? order : "asc";
      const handleClick = () => {
        if (!isSortCell) return;
        handleSort(rowKey);
      };

      /**
       * Defines the sorting cell
       */
      const sortingCell = (
        <TableSortLabel
          active={active}
          IconComponent={KeyboardArrowDownIcon}
          direction={direction}
          onClick={handleClick}
        >
          {label}
        </TableSortLabel>
      );

      let columnLabel = isSortCell ? sortingCell : column.label;

      if (type === "checkbox" && addedByPlugin) {
        columnLabel = (
          <Checkbox
            color="secondary"
            checked={
              collection.length > 0 && selected.length === collection.length
            }
            indeterminate={
              selected.length > 0 && selected.length < collection.length
            }
            classes={{ root: baseClasses.checkboxRoot }}
            onChange={handleSelectAllClick}
          />
        );
      }

      return (
        <TableCell
          classes={tableCellClasses}
          key={shortid.generate()}
          align={column.align}
          sortDirection={sortDirection}
          onClick={handleClick}
          className={clsx({
            [baseClasses.checkboxCell]: type === "checkbox" && addedByPlugin,
          })}
        >
          {columnLabel}
        </TableCell>
      );
    });
  };

  const isSelected = (selectedKey: string) =>
    selected.indexOf(selectedKey) !== -1;

  const getValue = (
    isCounter: boolean,
    column: TableColumnData,
    row: TableRowData,
    key: string,
    index: number
  ) => {
    const { displayCount, addedByPlugin, type } = column;

    if (addedByPlugin) {
      if (isCounter && displayCount) {
        if (pagination?.enabled && pagination.type === "automatic") {
          return displayCount(rowsPerPage * page + index);
        }
        return displayCount(index);
      }

      if (type === "checkbox") {
        const isItemSelected = selectKey ? isSelected(row[selectKey]) : false;

        return (
          <Checkbox
            className={baseClasses.checkboxRoot}
            checked={isItemSelected}
          />
        );
      }
    }

    if (key) {
      if (row[key] instanceof Date) {
        const defaultDateFormat = "dd-MM-yyyy HH:mm";
        return formatDate(new Date(row[key]), dateFormat || defaultDateFormat);
      }

      return row[key];
    }

    return null;
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <TableRow classes={tableRowClasses}>
          <TableCell
            align="center"
            colSpan={tableHeaders.length}
            classes={tableCellClasses}
            className={baseClasses.loadingCell}
          >
            {loadingComponent ? (
              loadingComponent
            ) : (
              <CircularProgress color="secondary" />
            )}
          </TableCell>
        </TableRow>
      );
    }

    if (searchFailed || (!loading && collection.length < 1)) {
      return (
        <TableRow classes={tableRowClasses}>
          <TableCell
            align="center"
            colSpan={tableHeaders.length}
            classes={tableCellClasses}
          >
            {notFoundComponent ? notFoundComponent : <h1> No data found </h1>}
          </TableCell>
        </TableRow>
      );
    }

    return collection.map((row, index) => {
      const isItemSelected = selectKey ? isSelected(row[selectKey]) : false;

      return (
        <TableRow
          key={shortid.generate()}
          role={plugins?.includes("withBulkDelete") ? "checkbox" : "row"}
          selected={isItemSelected}
          tabIndex={-1}
          classes={tableRowClasses}
        >
          {tableHeaders.map((column) => {
            const { rowKey, isCounter, align, type, addedByPlugin } = column;
            const key = rowKey ? rowKey : "";

            const displayValue =
              getValue(isCounter || false, column, row, key, index) || row[key];
            let cellOnClick:
              | (MouseEventHandler<HTMLTableHeaderCellElement> &
                  MouseEventHandler<HTMLTableDataCellElement>)
              | undefined;

            const isSelectable =
              (rowKey &&
                plugins?.includes("withBulkDelete") &&
                !excluseSelectKeys?.includes(rowKey)) ||
              (type === "checkbox" && addedByPlugin);

            if (isSelectable) {
              cellOnClick = (event) =>
                handleSelectRow(event, selectKey ? row[selectKey] : "");
            }

            return (
              <TableCell
                key={shortid.generate()}
                align={align}
                onClick={cellOnClick}
                classes={tableCellClasses}
                className={clsx({
                  [baseClasses.checkboxCell]:
                    type === "checkbox" && addedByPlugin,
                  [baseClasses.selectableCell]: isSelectable,
                })}
              >
                {displayValue}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };

  useEffect(() => {
    setCollection(prepareTableCollection(rows));
  }, [rows, page, rowsPerPage]);

  useEffect(() => {
    if (columns.length > 0) {
      const tableHeaders = [...columns];

      if (plugins?.includes("withCount")) {
        tableHeaders.unshift({
          isCounter: true,
          label: "#",
          rowKey: null,
          skipKey: true,
          align: "center",
          searchField: false,
          displayCount: (index: number) => index + 1,
          addedByPlugin: true,
        });
      }

      if (plugins?.includes("withBulkDelete")) {
        tableHeaders.unshift({
          rowKey: null,
          align: "center",
          searchField: false,
          type: "checkbox",
          addedByPlugin: true,
        });
      }

      setTableHeaders(tableHeaders);
    }
  }, [columns]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  /**
   * Handles formatting the value, to normalize it for search comparisons
   * @param {String|Number|Boolean} value
   */
  const formatValue = (value: string, dict: { [key: string]: string }) => {
    const excessWhitespace = /^\s+|\s+$|\s+(?=\s)/g;
    if (!value) return "";
    return value
      .toString()
      .toLowerCase()
      .replace(excessWhitespace, "")
      .replace(/[^\w ]/g, function (char) {
        return dict[char] || char;
      });
  };

  /**
   * Handles getting the first match during search
   */
  const getFirstMatch = (row: TableRowData) => {
    let matchFound = false;
    tableHeaders.forEach((header) => {
      const { searchField, rowKey } = header;
      if (matchFound) return;

      if (searchField && rowKey) {
        let dict = { â: "a", ă: "a", ș: "s", î: "i", ț: "t" };
        const value = getValue(false, header, row, rowKey, 0);
        matchFound = formatValue(value, dict).includes(search.toLowerCase());
      }
    });

    return matchFound;
  };

  /**
   * Handles resetting the search state
   */
  const handleResetSearch = () => {
    setSearch("");
    setSearchFailed(false);
  };

  /**
   * Handles triggering a search
   */
  useEffect(() => {
    if (searchLoading) {
      setTimeout(() => {
        setSearchReady(true);
      }, 200);
    }
  }, [searchLoading]);

  /**
   * Handles the dynamic search
   */
  useEffect(() => {
    if (searchReady) {
      console.log("rows:", rows);
      const updatedCollection = rows.filter((row) => getFirstMatch(row));
      console.log("updatedCollection:", updatedCollection);
      if (updatedCollection.length < 1 && !searchFailed) setSearchFailed(true);
      if (updatedCollection.length > 0 && searchFailed) setSearchFailed(false);

      setCollection(updatedCollection);
      setSearchReady(false);
      setTimeout(() => {
        setSearchLoading(false);
      }, 600);
    }
    // eslint-disable-next-line
  }, [searchReady]);
  console.log("collection X :", collection);
  /**
   * Handles updating the loading state or resetting the data
   */
  useEffect(() => {
    if (search.length >= 2) setSearchLoading(true);
    if (search.length < 2) {
      setCollection(rows);
      setSearchReady(false);
      setSearchFailed(false);
      setSearchLoading(false);
    }
    // eslint-disable-next-line
  }, [search]);

  /**
   * Gets the search input prefix
   */
  const getPrefix = () => {
    return searchLoading ? (
      <CircularProgress size={20} color="secondary" />
    ) : (
      <SearchIcon className={baseClasses.icon} />
    );
  };

  /**
   * Gets the table stats text
   */
  const getStatsText = () => {
    if (loading) return <CircularProgress size={20} color="secondary" />;
    return `${collection.length} out of ${rows.length} results displayed.`;
  };

  const getActiveStatus = () => {
    return selected.length > 0;
  };

  const handleBulkDelete = () => {
    if (selected.length > 0 && onBulkDelete) {
      const toBeDeleted = collection.filter((row) => selected.includes(row.id));

      onBulkDelete(toBeDeleted);
      setSelected([]);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={baseClasses.paper} {...paperProps}>
      <Toolbar
        {...toolbarProps}
        className={clsx(toolbarProps?.className, {
          [baseClasses.toolbarActive]: getActiveStatus(),
        })}
      >
        <Grid container alignItems="center">
          {selected.length > 0 ? (
            <Grid item xs={12}>
              <div className={baseClasses.bulkDeleteContainer}>
                <Typography className={baseClasses.bulkSelectedCount}>
                  {selected.length} selected
                </Typography>
                <IconButton
                  onClick={handleBulkDelete}
                  className={baseClasses.bulkDeleteBtn}
                >
                  <DeleteOutlineOutlined />
                </IconButton>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sm={3}>
              <div className={baseClasses.actions}>
                {plugins?.includes("withSearch") && (
                  <Fragment>
                    <InpuText
                      value={search}
                      name="search"
                      placeholder="Quick search"
                      debounce={searchReady}
                      onChange={handleSearch}
                      autoFocus={false}
                      prefix={getPrefix()}
                    />
                    <Button
                      type="button"
                      variant="contained"
                      title="Undo"
                      onClick={handleResetSearch}
                      className={baseClasses.undoBtn}
                    >
                      <UndoIcon />
                    </Button>
                  </Fragment>
                )}
                {plugins?.includes("withAdd") && onAdd && (
                  <Button
                    type="button"
                    variant="contained"
                    title="Undo"
                    onClick={onAdd}
                    className={baseClasses.addBtn}
                  >
                    <AddIcon />
                  </Button>
                )}
              </div>
            </Grid>
          )}

          {selected.length < 1 && plugins?.includes("withStats") && (
            <Grid item xs={12} sm={9}>
              <Typography variant="caption" className={baseClasses.stats}>
                {getStatsText()}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Toolbar>
      <TableContainer {...tableContainerProps}>
        <Table
          {...tableProps}
          className={clsx(baseClasses.table, classes.table)}
        >
          <TableHead {...tableHeadProps}>
            <TableRow classes={tableRowClasses}>{renderTableHead()}</TableRow>
          </TableHead>
          <TableBody {...tableBodyProps}>{renderTableBody()}</TableBody>
        </Table>
        {pagination && (
          <Fragment>
            <Table
              {...tableProps}
              className={clsx(baseClasses.table, classes.table)}
            >
              <TableBody {...tableBodyProps}>
                <TableRow classes={tableRowClasses}>
                  <TablePagination
                    classes={{
                      root: baseClasses.paginationRoot,
                      spacer: baseClasses.paginationSpacer,
                    }}
                    rowsPerPageOptions={pagination.rowsPerPageOptions}
                    colSpan={tableHeaders.length}
                    rowSpan={1}
                    count={
                      pagination.type === "automatic"
                        ? rows.length
                        : pagination?.total
                        ? pagination.total
                        : rows.length
                    }
                    rowsPerPage={
                      pagination.type === "automatic"
                        ? rowsPerPage
                        : pagination.rowsPerPage
                    }
                    page={
                      pagination.type === "automatic"
                        ? page
                        : pagination.currentPage
                        ? pagination.currentPage - 1
                        : 1
                    }
                    onChangePage={
                      pagination.type === "automatic"
                        ? handleChangePage
                        : pagination.handlePageChange
                        ? pagination.handlePageChange
                        : () => {}
                    }
                    onChangeRowsPerPage={
                      pagination.type === "automatic"
                        ? handleChangeRowsPerPage
                        : pagination.handleRowsPerChange
                    }
                  />
                </TableRow>
              </TableBody>
            </Table>
          </Fragment>
        )}
      </TableContainer>
    </Paper>
  );
};
