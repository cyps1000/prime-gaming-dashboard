/**
 * Imports TS Definitions
 */
import { TableColumnData, Plugin } from "./DynamicTable.types";

/**
 * Handles getting plugin related utility functions
 */
export const pluginService = (plugins?: Plugin[]) => {
  const pluginsList: { [key: string]: boolean } = {};

  /**
   * Handles filling up the plugins list with any plugins that have been picked
   */
  if (plugins && plugins.length > 1) {
    plugins.forEach((plugin: Plugin) => {
      pluginsList[plugin.toString()] = true;
    });
  }

  /**
   * Handles injecting a plugin into the columns
   */
  const injectPlugin = (plugin: Plugin, columns: TableColumnData[]) => {
    switch (plugin) {
      case "withCount":
        columns.unshift({
          label: "#",
          rowKey: null,
          align: "center",
          searchField: false,
          plugin: {
            name: plugin,
            displayCount: (index: number) => index + 1,
          },
        });
        break;
      case "withBulkDelete":
        columns.unshift({
          rowKey: null,
          align: "center",
          searchField: false,
          type: "checkbox",
          plugin: {
            name: plugin,
          },
        });
        break;
      default:
        break;
    }
  };

  /**
   * Handles checking if a plugin is enabled
   */
  const pluginEnabled = (plugin: Plugin) => pluginsList[plugin.toString()];

  return { pluginEnabled, injectPlugin };
};
