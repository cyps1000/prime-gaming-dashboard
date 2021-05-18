/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import { DynamicTable, DynamicTableProps } from "./DynamicTable";

export default {
  title: "Components/DynamicTable",
  component: DynamicTable,
} as Meta;

/**
 * Defines the Template
 * @param args DynamicTableProps
 * @returns
 */
const Template: Story<DynamicTableProps> = (args) => <DynamicTable {...args} />;

/**
 * Default case
 */
export const Default = Template.bind({});

/**
 * Put your component props in here
 *
 * Example:
 * Default.args = {
 *  text: "Hello World"
 * }
 *
 * Assuming that the component expects a prop text that is a string.
 */
Default.args = {};
