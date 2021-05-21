/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import DashboardAccounts from "./DashboardAccounts";

export default {
  title: "Components/DashboardAccounts",
  component: DashboardAccounts,
} as Meta;

/**
 * Defines the Template
 * @param args DashboardAccountsProps
 * @returns
 */
const Template: Story = (args) => <DashboardAccounts {...args} />;

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
