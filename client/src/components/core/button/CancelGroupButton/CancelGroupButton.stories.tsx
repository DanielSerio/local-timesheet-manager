import type { Meta, StoryObj } from "@storybook/react-vite";
import { CancelGroupButton } from "./CancelGroupButton";

const meta = {
  title: "Core/Button/CancelGroupButton",
  component: CancelGroupButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Save",
    initButton: {
      buttonText: "Edit",
    },
  },
} satisfies Meta<typeof CancelGroupButton>;
export default meta;
type Story = StoryObj<typeof meta>;
let isExposed = false;

export const NormalCancelGroup: Story = {
  args: {
    children: "Save",
    initButton: {
      buttonText: "Edit",
    },
    isExposed,
    setIsExposed: () => (isExposed = false),
  },
};
