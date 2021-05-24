/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import ProtectedRoutes from "./ProtectedRoutes";

export default {
  title: "Components/ProtectedRoutes",
  component: ProtectedRoutes,
} as Meta;

/**
 * Defines the Template
 * @param args ProtectedRoutesProps
 * @returns
 */
const Template: Story = (args) => <ProtectedRoutes {...args} />;

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
