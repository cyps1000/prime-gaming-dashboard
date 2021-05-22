/**
 * Imports TS Definitions
 */
import { SortOrder, TableRowData, TableColumnData } from "./DynamicTable.types";

/**
 * Defines the comparator
 */
export const descendingComparator = (
  a: TableRowData,
  b: TableRowData,
  orderBy: string
) => (columns: TableColumnData[]) => {
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
export const getComparator: (
  order: SortOrder,
  orderBy: string,
  columns: TableColumnData[]
) => any = (order, orderBy, columns) => {
  return order === "desc"
    ? (a: TableRowData, b: TableRowData) =>
        descendingComparator(a, b, orderBy)(columns)
    : (a: TableRowData, b: TableRowData) =>
        -descendingComparator(a, b, orderBy)(columns);
};

/**
 * Handles sorting the array
 */
export const stableSort: (
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
 * Handles formatting the value, to normalize it for search comparisons
 * @param {String|Number|Boolean} value
 */
export const formatValue = (value: string) => {
  const excessWhitespace = /^\s+|\s+$|\s+(?=\s)/g;
  const dict: { [key: string]: any } = {
    â: "a",
    ă: "a",
    ș: "s",
    î: "i",
    ț: "t",
  };

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
 * Handles getting the selected row
 */
export const getSelectedRow = (
  index: number,
  selected: string[],
  key: string
) => {
  let selectedRow: string[] = [];

  switch (true) {
    case index === -1:
      return (selectedRow = selectedRow.concat(selected, key));
    case index === 0:
      return (selectedRow = selectedRow.concat(selected.slice(1)));
    case index === selected.length - 1:
      return (selectedRow = selectedRow.concat(selected.slice(0, -1)));
    default:
      const start = selected.slice(0, index);
      const end = selected.slice(index + 1);
      return (selectedRow = selectedRow.concat(start, end));
  }
};
