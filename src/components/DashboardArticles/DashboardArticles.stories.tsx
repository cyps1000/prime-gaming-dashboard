/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import DashboardArticles, { DashboardArticlesProps } from "./DashboardArticles";

export default {
  title: "Components/DashboardArticles",
  component: DashboardArticles,
} as Meta;

/**
 * Defines the Template
 * @param args DashboardArticlesProps
 * @returns
 */
const Template: Story<DashboardArticlesProps> = (args) => (
  <DashboardArticles {...args} />
);

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
