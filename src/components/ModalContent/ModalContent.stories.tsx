/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import ModalContent, { ModalContentProps } from "./ModalContent";

export default {
  title: "Components/ModalContent",
  component: ModalContent,
} as Meta;

/**
 * Defines the Template
 * @param args ModalContentProps
 * @returns
 */
const Template: Story<ModalContentProps> = (args) => <ModalContent {...args} />;

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
