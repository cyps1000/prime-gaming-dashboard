/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import InputLabel, { InputLabelProps } from "./InputLabel";

export default {
  title: "Components/InputLabel",
  component: InputLabel,
} as Meta;

/**
 * Defines the Template
 * @param args InputLabelProps
 * @returns
 */
const Template: Story<InputLabelProps> = (args) => <InputLabel {...args} />;

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
