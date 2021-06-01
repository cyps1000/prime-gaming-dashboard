/**
 * Imports Material UI Components
 */
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * Imports Components
 */
import {
  DynamicTable,
  DynamicTableProps,
  TableColumnData,
  TableRowData,
  Plugin,
  SortOrder,
  MaterialProps,
  TablePaginationProps,
} from "../DynamicTable";

/**
 * Imports the component styles
 */
import { useStyles } from "./PrimeTable.styles";

/**
 * Defines the props interface
 */
export interface PrimeTableProps {
  loading?: boolean;
  columns: TableColumnData[];
  rows: TableRowData[];
  plugins?: Plugin[];
  onAdd?: DynamicTableProps["config"]["onAdd"];
  onBulkDelete?: DynamicTableProps["config"]["onBulkDelete"];
  selectKey?: string;
  excludeSelectKeys?: string[];
  orderBy: string;
  order: SortOrder;
  pagination?: TablePaginationProps;
}

/**
 * Displays the component
 */
const PrimeTable: React.FC<PrimeTableProps> = (props) => {
  const {
    loading,
    columns,
    rows,
    pagination,
    plugins,
    onAdd,
    onBulkDelete,
    selectKey,
    excludeSelectKeys,
    order,
    orderBy,
  } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  const getLoadingComponent = () => {
    return (
      <div className={classes.loader}>
        <CircularProgress size={25} color="secondary" /> Please wait while we're
        fetching your data
      </div>
    );
  };

  const getNotFoundComponent = () => {
    return (
      <div className={classes.notFound}>
        We apologize but the collection is empty.😢
      </div>
    );
  };

  const getPaginationSettings = () => {
    const defaultSettings: TablePaginationProps = {
      enabled: true,
      type: "automatic",
      rowsPerPage: 10,
      rowsPerPageOptions: [5, 10, 15, 20, 25, 30],
    };

    return pagination ? pagination : defaultSettings;
  };

  const getMaterialProps = () => {
    const materialProps: MaterialProps = {
      tableProps: {
        size: "small",
      },
      paperProps: {
        className: classes.paper,
      },
      toolbarProps: {
        className: classes.toolbar,
      },
      tableHeadProps: {
        className: classes.tableHead,
      },
      tableBodyProps: {
        className: classes.tableBody,
      },
    };

    return materialProps;
  };

  const getPluginsConfig = () => {
    const defaltPlugins: Plugin[] = [
      "withSort",
      "withCount",
      "withSearch",
      "withStats",
      "withAdd",
      "withBulkDelete",
    ];
    return plugins ? plugins : defaltPlugins;
  };

  const getTableClasses = () => {
    const tableClasses: DynamicTableProps["classes"] = {
      table: classes.table,
      tableCell: {
        head: classes.head,
        body: classes.body,
      },
      tableRow: {
        root: classes.tableRow,
      },
    };
    return tableClasses;
  };

  const getDynamicTableConfig = () => {
    const tableProps: DynamicTableProps = {
      loading,
      config: {
        columns,
        rows,
        loadingComponent: getLoadingComponent(),
        notFoundComponent: getNotFoundComponent(),
        pagination: getPaginationSettings(),
        materialProps: getMaterialProps(),
        plugins: getPluginsConfig(),
        selectKey,
        excludeSelectKeys,
        order,
        orderBy,
      },
      classes: getTableClasses(),
    };

    if (onAdd) tableProps["config"]["onAdd"] = onAdd;
    if (onBulkDelete) tableProps["config"]["onBulkDelete"] = onBulkDelete;

    return { ...tableProps };
  };

  return <DynamicTable {...getDynamicTableConfig()} />;
};

export default PrimeTable;
