/**
 * External Imports
 */
import clsx from "clsx";
import shortid from "shortid";

/**
 * Imports Material UI components
 */
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Checkbox from "@material-ui/core/Checkbox";

/**
 * Imports TS Definitions
 */
import { DynamicTableHeadProps, TableColumnData } from "./DynamicTable.types";

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
const DynamicTableHead: React.FC<DynamicTableHeadProps> = (props) => {
  const {
    columns,
    rows,
    order,
    orderBy,
    plugins,
    handleSort,
    handleSelectAll,
    selected,
    tableCellClasses,
    tableRowClasses,
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
   * Checks if the bulk delete plugin is enabled
   */
  const withBulkDelete = pluginEnabled("withBulkDelete");

  /**
   * Checks if the sort plugin is enabled
   */
  const withSort = pluginEnabled("withSort");

  /**
   * Handles getting the cell's display value
   */
  const getCellDisplayValue = (column: TableColumnData) => {
    /**
     * Gets the column data
     */
    const { label, rowKey, sort, type } = column;

    /**
     * Checks if the cell is active
     */
    const active = orderBy === rowKey;

    /**
     * Checks if the cell supports sorting
     */
    const isSortCell = sort && withSort;

    /**
     * Defines the sorting direction
     */
    const sortDirection = active ? order : "asc";

    /**
     * Handles sorting the rows
     */
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
        direction={sortDirection}
        onClick={handleClick}
      >
        {label}
      </TableSortLabel>
    );

    let displayValue = isSortCell ? sortingCell : label;

    if (type === "checkbox" && withBulkDelete) {
      /**
       * Defines the checked state
       */
      const checked = rows.length > 0 && selected.length === rows.length;

      /**
       * Defines the indeterminate state
       */
      const indeterminate =
        selected.length > 0 && selected.length < rows.length;

      /**
       * Defines the component classes
       */
      const checkboxClasses = {
        root: baseClasses.checkboxRoot,
      };

      displayValue = (
        <Checkbox
          color="secondary"
          checked={checked}
          indeterminate={indeterminate}
          classes={checkboxClasses}
          onChange={handleSelectAll}
        />
      );
    }

    return displayValue;
  };

  /**
   * Generates the table row cells
   */
  const generateCells = () => {
    return columns.map((column) => {
      /**
       * Gets the column data
       */
      const { type, style, align } = column;

      /**
       * Gets the display value
       */
      const displayValue = getCellDisplayValue(column);

      /**
       * Generates a unique key
       */
      const cellKey = shortid.generate();

      /**
       * Defines the cell className
       */
      const cellClassName = clsx({
        [baseClasses.checkboxCell]: type === "checkbox" && withBulkDelete,
      });

      return (
        <TableCell
          classes={tableCellClasses}
          key={cellKey}
          align={align}
          className={cellClassName}
          style={style}
        >
          {displayValue}
        </TableCell>
      );
    });
  };

  return <TableRow classes={tableRowClasses}>{generateCells()}</TableRow>;
};

export default DynamicTableHead;
