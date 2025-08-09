import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApiTable } from "./ApiTable";
import { IDCell } from "../cell/IDCell";
import type { ApiTableColumnDef } from "./ApiTable.props";
import { NameCell } from "../cell/NameCell";
import { TimeCell } from "../cell/TimeCell";

const meta = {
  title: "Table/ApiTable",
  component: ApiTable,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    columns: [
      {
        id: 'id',
        header: 'ID',
        size: 60,
        accessorKey: 'id'
      },
      {
        id: 'name',
        header: 'name',
        size: 240,
        accessorKey: 'name'
      },
      {
        id: 'totalTime',
        header: 'Total Time',
        size: 120,
        accessorKey: 'totalTime'
      }
    ] satisfies ApiTableColumnDef<{ id: number; name: string; totalTime: number; }>[],
    isLoading: false,
    error: null,
    data: {
      paging: {
        limit: 25,
        offset: 0,
        total: {
          records: 0,
          pages: 0
        }
      },
      sorting: null,
      records: []
    }
  },
} satisfies Meta<typeof ApiTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingStory: Story = {
  name: 'ApiTable - Loading',
  args: {
    isLoading: true
  }
};

const error = new Error(`This is a demo error for Storybook`);
error.name = 'PseudoError';

export const ErrorStory: Story = {
  name: 'ApiTable - Error',
  args: {
    isLoading: false,
    error
  }
};

export const EmptyStory: Story = {
  name: 'ApiTable - Empty',
  args: {
    isLoading: false,
    error: null
  }
};

export const DataStory: Story = {
  name: 'ApiTable - Data',
  args: {
    columns: [
      {
        id: 'id',
        header: 'ID',
        size: 60,
        accessorKey: 'id',
        cell: IDCell
      },
      {
        id: 'name',
        header: 'name',
        size: 240,
        //@ts-ignore: next-line
        accessorFn({ id, name }) {
          return {
            href: `#/somewhere/${id}`,
            name
          };
        },
        cell: NameCell,
      },
      {
        id: 'totalTime',
        header: 'Total Time',
        size: 120,
        accessorKey: 'totalTime',
        cell: TimeCell
      }
    ],
    isLoading: false,
    error: null,
    data: {
      paging: {
        limit: 25,
        offset: 0,
        total: {
          records: 0,
          pages: 0
        }
      },
      sorting: null,
      records: [
        {
          id: 1,
          name: 'Timesheet #1',
          totalTime: 460
        },
        {
          id: 2,
          name: 'Timesheet #2',
          totalTime: 480
        },
        {
          id: 3,
          name: 'Timesheet #3',
          totalTime: 420
        },
        {
          id: 4,
          name: 'Timesheet #4',
          totalTime: 460
        },
      ]
    }
  }
};