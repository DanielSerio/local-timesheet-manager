import type { Meta, StoryObj } from "@storybook/react-vite";
import { Page } from "./Page";

const meta = {
  title: 'Layout/Page',
  parameters: {
    layout: 'centered'
  },
  component: Page,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalPage: Story = {
  args: {
    children: 'Content'
  }
};