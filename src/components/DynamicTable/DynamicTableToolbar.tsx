import { Fragment } from "react";

/**
 * External Imports
 */
import clsx from "clsx";

/**
 * Imports Material UI components
 */
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import UndoIcon from "@material-ui/icons/Undo";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineOutlined from "@material-ui/icons/DeleteOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";

/**
 * Imports Components
 */
import InpuText from "../InputText";

/**
 * Imports TS Definitions
 */
import { DynamicTableToolbarProps } from "./DynamicTable.types";

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
const DynamicTableToolbar: React.FC<DynamicTableToolbarProps> = (props) => {
  const {
    search,
    searchReady,
    searchLoading,
    handleSearch,
    handleResetSearch,
    loading,
    rows,
    columns,
    toolbarProps,
    selected,
    handleBulkDelete,
    onAdd,
    plugins,
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
   * Checks if the withAdd plugin is enabled
   */
  const withAdd = pluginEnabled("withAdd");

  /**
   * Checks if the withStats plugin is enabled
   */
  const withStats = pluginEnabled("withStats");

  /**
   * Checks if the withSearch plugin is enabled
   */
  const withSearch = pluginEnabled("withSearch");

  /**
   * Defines the toolbar className
   */
  const toolbarClassName = clsx(toolbarProps?.className, {
    [baseClasses.toolbarActive]: selected.length > 0,
  });

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
    return `${columns.length} out of ${rows.length} results displayed`;
  };

  /**
   * Handles getting the selected toolbar layout
   */
  const renderSelectedToolbar = () => {
    return (
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
    );
  };

  /**
   * Handles rendering the search input
   */
  const renderSearch = () => {
    if (!withSearch) return null;

    return (
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
    );
  };

  /**
   * Handles rendering the add button
   */
  const renderAddBtn = () => {
    if (!withAdd || !onAdd) return null;

    return (
      <Button
        type="button"
        variant="contained"
        title="Undo"
        onClick={onAdd}
        className={baseClasses.addBtn}
      >
        <AddIcon />
      </Button>
    );
  };

  /**
   * Handles rendering the table stats
   */
  const renderStats = () => {
    if (!withStats) return null;

    return (
      <Grid item xs={12} sm={9}>
        <Typography variant="caption" className={baseClasses.stats}>
          {getStatsText()}
        </Typography>
      </Grid>
    );
  };

  /**
   * Handles rendering the default toolbar
   */
  const renderDefaultToolbar = () => {
    return (
      <Fragment>
        <Grid item xs={12} sm={3}>
          <div className={baseClasses.actions}>
            {renderSearch()}
            {renderAddBtn()}
          </div>
        </Grid>
        {renderStats()}
      </Fragment>
    );
  };

  return (
    <Toolbar {...toolbarProps} className={toolbarClassName}>
      <Grid container alignItems="center">
        {selected.length > 0 ? renderSelectedToolbar() : renderDefaultToolbar()}
      </Grid>
    </Toolbar>
  );
};

export default DynamicTableToolbar;
