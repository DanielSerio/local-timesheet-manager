import type { Meta, StoryObj } from "@storybook/react-vite";
import { EntitySearch } from "./EntitySearch";
import { expect, fn } from "storybook/internal/test";
import type { Category } from "@/lib/types/category.types";

const meta = {
  title: "Core/Control/EntitySearch",
  component: EntitySearch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    entityName: "category",
    defaultValue: null,
    isLoading: false,
    options: createItems(12) as Category[],
    getOptionLabel: (option: ReturnType<typeof createItems>[number]) =>
      option.name,
    getOptionValue: (option: ReturnType<typeof createItems>[number]) =>
      option.id,
  },
} satisfies Meta<typeof EntitySearch>;
export default meta;

type Story = StoryObj<typeof meta>;

function createItems(n: number) {
  function createItem(index: number) {
    const id = index + 1;

    return {
      id,
      name: `Item #${id}`,
    };
  }

  return [...new Array(n)].map((_, i) => createItem(i));
}

export const NormalEntitySearch: Story = {
  name: "EntitySearch",
  args: {
    isLoading: false,
    options: createItems(12) as Category[],
  },
};

export const LoadingEntitySearch: Story = {
  name: "EntitySearch - Loading",
  args: {
    options: undefined,
    isLoading: true,
  },
};
