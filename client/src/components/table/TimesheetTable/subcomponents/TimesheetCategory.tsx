import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@/lib/types/category.types";
import type { Subcategory } from "@/lib/types/subcategory.types";

export interface TimesheetCategoryProps<
  CatType extends Category | Subcategory,
> {
  isLoading?: boolean;
  id?: number;
  categories?: CatType[];
}
export function TimesheetCategory<CatType extends Category | Subcategory>({
  isLoading,
  categories,
  id,
}: TimesheetCategoryProps<CatType>) {
  if (isLoading) {
    return <Skeleton className="h-4 w-full my-1" />;
  }

  const foundCategory = categories?.find((cat) => cat.id === id);

  if (!foundCategory) {
    return <p className="text-xs text-destructive">Not found</p>;
  }

  return <>{foundCategory.name}</>;
}
