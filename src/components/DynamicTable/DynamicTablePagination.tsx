/**
 * Imports the component styles
 */
import { useStyles } from "./DynamicTable.styles";

/**
 * Imports Material UI components
 */
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

/**
 * Imports TS Definitions
 */
import { DynamicTablePaginationProps } from "./DynamicTable.types";

/**
 * Displays the component
 */
const DynamicTablePagination: React.FC<DynamicTablePaginationProps> = (
  props
) => {
  const {
    tableProps,
    tableBodyProps,
    pagination,
    tableRowClasses,
    tableClasses,
    columns,
    rows,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  /**
   * Gets the component styles
   */
  const baseClasses = useStyles();

  if (!pagination) return null;

  /**
   * Defines the automatic pagination flag
   */
  const isAutomatic = pagination.type === "automatic";

  /**
   * Defines the table pagination classes
   */
  const tablePaginationClasses = {
    root: baseClasses.paginationRoot,
    spacer: baseClasses.paginationSpacer,
  };

  /**
   * Handles getting the rows per page options
   */
  const getRowsPerPageOptions = () => {
    /**
     * Defines the default options
     */
    const defaultOptions = [5, 10, 15, 20, 25, 30];

    return pagination.rowsPerPageOptions || defaultOptions;
  };

  /**
   * Handles getting the pagination count
   */
  const getPaginationCount = () => {
    if (isAutomatic) {
      return rows.length;
    }

    return pagination.total || rows.length;
  };

  /**
   * Handles getting the rows per page
   */
  const getRowsPerPage = () => {
    if (isAutomatic) return rowsPerPage;

    return pagination.rowsPerPage;
  };

  /**
   * Handles getting the current page
   */
  const getCurrentPage = () => {
    if (isAutomatic || !pagination.currentPage) return page;

    return pagination.currentPage - 1;
  };

  /**
   * Handles getting the onChangePage function
   */
  const getOnChangePage = () => {
    if (isAutomatic || !pagination.handlePageChange) return handleChangePage;

    return pagination.handlePageChange;
  };

  /**
   * Handles getting te onChangeRowsPerPage function
   */
  const getOnChangeRowsPerPage = () => {
    if (isAutomatic || !pagination.handleRowsPerChange)
      return handleChangeRowsPerPage;

    return pagination.handleRowsPerChange;
  };

  return (
    <Table {...tableProps} className={tableClasses}>
      <TableBody {...tableBodyProps}>
        <TableRow classes={tableRowClasses}>
          <TablePagination
            classes={tablePaginationClasses}
            rowsPerPageOptions={getRowsPerPageOptions()}
            colSpan={columns.length}
            rowSpan={1}
            count={getPaginationCount()}
            rowsPerPage={getRowsPerPage()}
            page={getCurrentPage()}
            onChangePage={getOnChangePage()}
            onChangeRowsPerPage={getOnChangeRowsPerPage()}
          />
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DynamicTablePagination;
