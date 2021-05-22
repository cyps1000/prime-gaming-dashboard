import { useState, useEffect } from "react";

/**
 * External Imports
 */
import "date-fns";
import clsx from "clsx";
import { format as formatDate, isDate } from "date-fns";

/**
 * Imports Material UI components
 */
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

/**
 * Imports Components
 */
import DynamicTableToolbar from "./DynamicTableToolbar";
import DynamicTableHead from "./DynamicTableHead";
import DynamicTableBody from "./DynamicTableBody";
import DynamicTablePagination from "./DynamicTablePagination";

/**
 * Imports TS Definitions
 */
import {
  SortOrder,
  TableRowData,
  TableColumnData,
  TableCellClasses,
  TableRowClasses,
  DynamicTableProps,
  SelectAllClick,
  SelectRow,
  GetDisplayValue,
  HandleSearch,
  ChangeRowsPerPage,
} from "./DynamicTable.types";

/**
 * Imports util functions
 */
import {
  getComparator,
  stableSort,
  formatValue,
  getSelectedRow,
} from "./DynamicTable.utils";

/**
 * Imports the plugins service
 */
import { pluginService } from "./DynamicTable.plugins";

/**
 * Imports the component styles
 */
import { useStyles } from "./DynamicTable.styles";

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
    excludeSelectKeys,
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

  /**
   * Initializes the search input
   */
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

  /**
   * Initializes the selected state
   */
  const [selected, setSelected] = useState<string[]>([]);

  /**
   * Initializes the page count
   */
  const [page, setPage] = useState(0);

  /**
   * Initializes the rows per page
   */
  const [rowsPerPage, setRowsPerPage] = useState(pagination?.rowsPerPage || 10);

  /**
   * Handles getting the plugin enabled helper function
   */
  const { pluginEnabled, injectPlugin } = pluginService(plugins);

  /**
   * Defines the table cell classes
   */
  const tableCellClasses: TableCellClasses = {
    head: classes.tableCell?.head,
    body: classes.tableCell?.body,
  };

  /**
   * Defines the table row classes
   */
  const tableRowClasses: TableRowClasses = {
    root: classes.tableRow?.root,
  };

  /**
   * Defines the table classes
   */
  const tableClasses = clsx(baseClasses.table, classes.table);

  /**
   * Handles checking if the table data is ready
   */
  const isTableDataReady = (
    columns: TableColumnData[],
    collection: TableRowData[]
  ) => {
    return columns && columns.length > 0 && collection && collection.length > 0;
  };

  /**
   * Handles getting the table data
   * Also makes sure to sort it
   */
  const prepareTableCollection = (collection: TableRowData[]) => {
    if (isTableDataReady(columns, collection)) {
      const comparator = getComparator(order, orderBy, columns);
      if (pagination?.enabled && pagination.type === "automatic") {
        return handleAutomaticPagination(collection, comparator);
      }

      return stableSort(collection, comparator);
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

  /**
   * Handles selecting all rows
   */
  const handleSelectAllClick: SelectAllClick = (event) => {
    if (event.target.checked && selectKey) {
      return setSelected(collection.map((item) => item[selectKey]));
    }
    setSelected([]);
  };

  /**
   * Handles selecting a row
   */
  const handleSelectRow: SelectRow = (event, key) => {
    const selectedIndex = selected.indexOf(key);
    const selectedRow = getSelectedRow(selectedIndex, selected, key);

    setSelected(selectedRow);
  };

  /**
   * Handles the automatic pagination
   */
  const handleAutomaticPagination = (
    collection: TableRowData[],
    comparator: (order: SortOrder, orderBy: string) => any
  ) => {
    const startingPoint = page * rowsPerPage;
    const endingPoint = page * rowsPerPage + rowsPerPage;

    return stableSort(collection, comparator).slice(startingPoint, endingPoint);
  };

  /**
   * Handles changing the current active page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Handles changing the rows per page state
   */
  const handleChangeRowsPerPage: ChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * Checks if the row is selected
   */
  const isSelected = (selectedKey: string) =>
    selected.indexOf(selectedKey) !== -1;

  /**
   * Handles getting the display value
   */
  const getDisplayValue: GetDisplayValue = (column, row, rowIndex) => {
    const { rowKey, plugin } = column;
    const key = rowKey ? rowKey : "";

    if (plugin) {
      const paginationEnabled = pagination?.enabled;
      const paginationAuto = pagination?.type === "automatic";

      switch (plugin.name) {
        case "withCount":
          if (paginationEnabled && paginationAuto) {
            return plugin.displayCount(rowsPerPage * page + rowIndex);
          }
          return plugin.displayCount(rowIndex);
        case "withBulkDelete":
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
      if (isDate(row[key])) {
        const defaultDateFormat = "dd-MM-yyyy HH:mm";
        return formatDate(new Date(row[key]), dateFormat || defaultDateFormat);
      }

      return row[key];
    }

    return null;
  };

  /**
   * Handles setting the search state
   */
  const handleSearch: HandleSearch = (event) => {
    setSearch(event.target.value);
  };

  /**
   * Handles resetting the search state
   */
  const handleResetSearch = () => {
    setSearch("");
    setSearchFailed(false);
  };

  /**
   * Handles resetting the search state
   */
  const resetSearchState = () => {
    setCollection(prepareTableCollection(rows));
    setSearchReady(false);
    setSearchFailed(false);
    setSearchLoading(false);
  };

  /**
   * Handles the bulk delete click
   */
  const handleBulkDelete = () => {
    if (selected.length > 0 && onBulkDelete) {
      const toBeDeleted = collection.filter((row) => selected.includes(row.id));

      onBulkDelete(toBeDeleted);
      setSelected([]);
    }
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
        const value = getDisplayValue(header, row, 0);
        matchFound = formatValue(value).includes(search.toLowerCase());
      }
    });

    return matchFound;
  };

  /**
   * Handles prepareing the table plugins
   */
  const prepareTablePlugins = (columns: TableColumnData[]) => {
    if (pluginEnabled("withCount")) {
      injectPlugin("withCount", columns);
    }

    if (pluginEnabled("withBulkDelete")) {
      injectPlugin("withBulkDelete", columns);
    }
  };

  /**
   * Handles setting the collection
   */
  useEffect(() => {
    setCollection(prepareTableCollection(rows));
  }, [rows, page, rowsPerPage, orderBy, order]);

  /**
   * Handles setting up the table  plugins and the headers
   */
  useEffect(() => {
    if (columns.length > 0) {
      const tableHeaders = [...columns];

      prepareTablePlugins(tableHeaders);
      setTableHeaders(tableHeaders);
    }
  }, [columns]);

  /**
   * Handles triggering a search
   */
  useEffect(() => {
    if (searchLoading) {
      const timer = setTimeout(() => {
        setSearchReady(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [searchLoading]);

  /**
   * Handles the dynamic search
   */
  useEffect(() => {
    if (searchReady) {
      const updatedCollection = rows.filter((row) => getFirstMatch(row));

      setSearchFailed(updatedCollection.length < 1 && !searchFailed);
      setCollection(updatedCollection);
      setSearchReady(false);
      setSearchLoading(false);

      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [searchReady]);

  /**
   * Handles updating the loading state or resetting the data
   */
  useEffect(() => {
    if (search.length >= 2) setSearchLoading(true);
    if (search.length < 2) resetSearchState();
    // eslint-disable-next-line
  }, [search]);

  return (
    <Paper className={baseClasses.paper} {...paperProps}>
      <DynamicTableToolbar
        toolbarProps={toolbarProps}
        search={search}
        searchReady={searchReady}
        searchLoading={searchLoading}
        handleSearch={handleSearch}
        handleResetSearch={handleResetSearch}
        handleBulkDelete={handleBulkDelete}
        onAdd={onAdd}
        columns={columns}
        rows={rows}
        plugins={plugins}
        selected={selected}
        loading={loading}
      />
      <TableContainer {...tableContainerProps}>
        <Table {...tableProps} className={tableClasses}>
          <TableHead {...tableHeadProps}>
            <DynamicTableHead
              columns={tableHeaders}
              rows={collection}
              order={order}
              orderBy={orderBy}
              plugins={plugins}
              handleSort={handleSort}
              handleSelectAll={handleSelectAllClick}
              selected={selected}
              tableCellClasses={tableCellClasses}
              tableRowClasses={tableRowClasses}
            />
          </TableHead>
          <TableBody {...tableBodyProps}>
            <DynamicTableBody
              columns={tableHeaders}
              rows={collection}
              plugins={plugins}
              selected={selected}
              tableCellClasses={tableCellClasses}
              tableRowClasses={tableRowClasses}
              loading={loading}
              loadingComponent={loadingComponent}
              notFoundComponent={notFoundComponent}
              selectKey={selectKey}
              excludeSelectKeys={excludeSelectKeys}
              searchFailed={searchFailed}
              getDisplayValue={getDisplayValue}
              handleSelectRow={handleSelectRow}
            />
          </TableBody>
        </Table>
        <DynamicTablePagination
          tableProps={tableProps}
          tableBodyProps={tableBodyProps}
          pagination={pagination}
          tableRowClasses={tableRowClasses}
          tableClasses={tableClasses}
          rows={rows}
          columns={tableHeaders}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};
