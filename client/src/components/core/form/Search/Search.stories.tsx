import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "./Search";

const meta = {
  title: "Core/Form/Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Search>;
export default meta;

type Story = StoryObj<typeof meta>;
