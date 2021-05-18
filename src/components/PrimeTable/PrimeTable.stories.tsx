/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import PrimeTable, { PrimeTableProps } from "./PrimeTable";

export default {
  title: "Components/PrimeTable",
  component: PrimeTable,
} as Meta;

/**
 * Defines the Template
 * @param args PrimeTableProps
 * @returns
 */
const Template: Story<PrimeTableProps> = (args) => <PrimeTable {...args} />;

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
