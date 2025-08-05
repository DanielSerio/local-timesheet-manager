import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimesheetTable } from "./TimesheetTable";

const meta = {
  title: "Table/TimesheetTable",
  component: TimesheetTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
  },
} satisfies Meta<typeof TimesheetTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalTimesheetTable: Story = {
  name: 'TimesheetTable',
  args: {
    children: "Content",
  },
};
