import type { Category } from "@/lib/types/category.types";
import { useTimesheetTableContext } from "./TimesheetTable.context";
import { TimesheetTableRow } from "./TimesheetTableRow";
import type { ListResponse } from "@/lib/types/response.types";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Subcategory } from "@/lib/types/subcategory.types";

export function TimesheetTableTBody() {
  const [
    {
      isReadOnly,
      grouping,
      categoriesQuery,
      subcategoriesQuery,
      gridTemplateColumns,
    },
  ] = useTimesheetTableContext();

  return (
    <div className="flex flex-col">
      {[...new Array(5)].map((_, i) => (
        <TimesheetTableRow
          key={`row:${i}`}
          isReadOnly={isReadOnly}
          runningTotal={0}
          grouping={grouping}
          gridTemplateColumns={gridTemplateColumns}
          categoriesQuery={
            categoriesQuery as UseQueryResult<ListResponse<Category>, Error>
          }
          subcategoriesQuery={
            subcategoriesQuery as UseQueryResult<
              ListResponse<Subcategory>,
              Error
            >
          }
        />
      ))}
    </div>
  );
}
