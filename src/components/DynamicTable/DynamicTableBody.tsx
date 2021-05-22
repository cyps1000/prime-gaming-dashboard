import { Fragment } from "react";

/**
 * External Imports
 */
import shortid from "shortid";
import clsx from "clsx";

/**
 * Imports Material UI components
 */
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Imports TS Definitions
 */
import {
  DynamicTableBodyProps,
  CellClick,
  TableRowData,
} from "./DynamicTable.types";

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
const DynamicTableBody: React.FC<DynamicTableBodyProps> = (props) => {
  const {
    loading,
    loadingComponent,
    selectKey,
    excludeSelectKeys,
    searchFailed,
    selected,
    rows,
    columns,
    plugins,
    notFoundComponent,
    tableCellClasses,
    tableRowClasses,
    getDisplayValue,
    handleSelectRow,
  } = props;

  /**
   * Gets the component styles
   */
  const baseClasses = useStyles();

  /**
   * Handles getting the plugin enabled helper function
   */
  const { pluginEnabled } = pluginService(plugins);

  /**
   * Checks if the row is selected
   */
  const isSelected = (selectedKey: string) =>
    selected.indexOf(selectedKey) !== -1;

  /**
   * Checks if the bulk delete plugin is enabled
   */
  const withBulkDelete = pluginEnabled("withBulkDelete");

  /**
   * Handles generating the table cells
   */
  const generateCells = (row: TableRowData, index: number) => {
    return columns.map((column) => {
      /**
       * Gets the column data
       */
      const { rowKey, align, style, type } = column;

      /**
       * Gets the cell's display value
       */
      const displayValue = getDisplayValue(column, row, index);

      /**
       * Generates a cell key
       */
      const cellKey = shortid.generate();

      /**
       * Gets the select key if there is one
       */
      const _selectKey = selectKey ? row[selectKey] : "";

      /**
       * Makes sure the current row is not an excluded key (from selecting it)
       */
      const keyNotExcluded = !excludeSelectKeys?.includes(rowKey || "");

      /**
       * Checks if this row is selectable
       */
      const isSelectable = withBulkDelete && keyNotExcluded;

      /**
       * Initializes the cell click function
       */
      let cellOnClick: CellClick;

      /**
       * Updates the cell click function if the row is selectable
       */
      if (isSelectable) {
        cellOnClick = (event) => handleSelectRow(event, _selectKey);
      }

      /**
       * Defines the cell class name
       */
      const tableCellClassName = clsx({
        [baseClasses.selectableCell]: isSelectable,
        [baseClasses.checkboxCell]: withBulkDelete && type === "checkbox",
      });

      return (
        <TableCell
          key={cellKey}
          align={align}
          onClick={cellOnClick}
          classes={tableCellClasses}
          className={tableCellClassName}
          style={style}
        >
          {displayValue}
        </TableCell>
      );
    });
  };

  /**
   * Handles generating the table rows
   */
  const generateRows = () => {
    return rows.map((row, index) => {
      /**
       * Checks if this row is selected
       */
      const isItemSelected = selectKey ? isSelected(row[selectKey]) : false;

      /**
       * Generates a unique row key
       */
      const rowKey = shortid.generate();

      /**
       * Gets the role of the row (for accessibility)
       */
      const rowRole = withBulkDelete ? "checkbox" : "row";

      return (
        <TableRow
          key={rowKey}
          role={rowRole}
          selected={isItemSelected}
          tabIndex={-1}
          classes={tableRowClasses}
        >
          {generateCells(row, index)}
        </TableRow>
      );
    });
  };

  /**
   * Handles getting the loading component
   */
  const getLoadingComponent = () =>
    loadingComponent ? (
      loadingComponent
    ) : (
      <CircularProgress color="secondary" />
    );

  /**
   * Handles getting the not found component
   */
  const getNotFoundComponent = () =>
    notFoundComponent ? notFoundComponent : <h1> No data found </h1>;

  /**
   * Handles rendering the loading component if the table is in loading state
   */
  if (loading) {
    return (
      <TableRow classes={tableRowClasses}>
        <TableCell
          align="center"
          colSpan={columns.length}
          classes={tableCellClasses}
          className={baseClasses.loadingCell}
        >
          {getLoadingComponent()}
        </TableCell>
      </TableRow>
    );
  }

  /**
   * Handles rendering the not found component if the search failed or there is no data
   */
  if (searchFailed || (!loading && rows.length < 1)) {
    return (
      <TableRow classes={tableRowClasses}>
        <TableCell
          align="center"
          colSpan={columns.length}
          classes={tableCellClasses}
        >
          {getNotFoundComponent()}
        </TableCell>
      </TableRow>
    );
  }

  return <Fragment>{generateRows()}</Fragment>;
};

export default DynamicTableBody;
