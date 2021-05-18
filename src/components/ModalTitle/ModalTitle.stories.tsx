/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import ModalTitle, { ModalTitleProps } from "./ModalTitle";

export default {
  title: "Components/ModalTitle",
  component: ModalTitle,
} as Meta;

/**
 * Defines the Template
 * @param args ModalTitleProps
 * @returns
 */
const Template: Story<ModalTitleProps> = (args) => <ModalTitle {...args} />;

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
