import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimeInput } from "./TimeInput";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Core/Control/TimeInput",
  component: TimeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalTimeInput: Story = {
  name: "TimeInput",
  args: {
    onChange: fn(),
  },
};
