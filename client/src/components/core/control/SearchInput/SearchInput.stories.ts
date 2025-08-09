import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "./SearchInput";
import { fn } from "storybook/internal/test";

const meta = {
  title: "Core/Control/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalSearchInput: Story = {
  name: "SearchInput",
  args: {
    onChange: fn(),
  },
};
