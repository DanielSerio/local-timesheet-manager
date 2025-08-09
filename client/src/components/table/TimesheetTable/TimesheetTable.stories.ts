import type { Meta, StoryObj } from "@storybook/react-vite";
import { TimesheetTable } from "./TimesheetTable";
import { TimesheetTableRow } from "./TimesheetTableRow";

const meta = {
  title: "Table/TimesheetTable/TimesheetTable",
  component: TimesheetTable,

  subcomponents: {
    TimesheetTableRow
  },
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    grouping: 'none',
    isReadOnly: true
  },
} satisfies Meta<typeof TimesheetTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalTimesheetTable: Story = {
  name: 'TimesheetTable',
  args: {
    timesheetId: -1
  },
};


export const CreateTimesheetTable: Story = {
  name: 'TimesheetTable - Create',
  args: {},
};
