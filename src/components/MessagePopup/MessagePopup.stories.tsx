/**
 * Storybook
 * @see https://storybook.js.org/docs/react/get-started/introduction
 */
import { Story, Meta } from "@storybook/react";

/**
 * Component Imports
 */
import MessagePopup, { MessagePopupProps } from "./MessagePopup";

export default {
  title: "Components/MessagePopup",
  component: MessagePopup,
} as Meta;

/**
 * Defines the Template
 * @param args MessagePopupProps
 * @returns
 */
const Template: Story<MessagePopupProps> = (args) => <MessagePopup {...args} />;

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
