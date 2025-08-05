import type { Input } from "@/components/ui/input";
import type { Category } from "@/lib/types/category.types";
import type { Subcategory } from "@/lib/types/subcategory.types";
import type { ComponentProps, ReactNode } from "react";

export interface EntitySearchProps<Option extends Category | Subcategory> extends Omit<ComponentProps<typeof Input>, 'defaultValue'> {
  defaultValue: number | null;
  isLoading?: boolean | null;
  options?: Option[];
  entityName: 'category' | 'subcategory';
  getOptionLabel: (option: Option) => ReactNode;
  getOptionValue: (option: Option) => number;
}