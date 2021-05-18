/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import Login, { LoginProps } from "./Login";

export default {
  title: "Components/Login",
  component: Login,
} as Meta;

/**
 * Defines the Template
 * @param args LoginProps
 * @returns
 */
const Template: Story<LoginProps> = (args) => <Login {...args} />;

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
