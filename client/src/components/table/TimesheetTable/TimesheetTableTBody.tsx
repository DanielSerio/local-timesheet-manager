import type { Category } from "@/lib/types/category.types";
import { useTimesheetTableContext } from "./TimesheetTable.context";
import { TimesheetTableRow } from "./TimesheetTableRow";
import type { ListResponse } from "@/lib/types/response.types";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Subcategory } from "@/lib/types/subcategory.types";
import { GridNavigation } from "@/components/keyboard/GridNavigation/GridNavigation";
import { differenceInMinutes } from "date-fns";
import { useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { LineTimes } from "./TimesheetTable.props";

type BaseType = object & { startTime: string; endTime: string };

function getFieldMinDiff<Type extends BaseType>(field: Type) {
  const dte = `2024-12-12`;
  return differenceInMinutes(
    new Date(`${dte}T${field.endTime}`),
    new Date(`${dte}T${field.startTime}`)
  );
}

function getLineTimes<Type extends BaseType>(fields: Type[]): LineTimes[] {
  return structuredClone(fields).map((field, index) => {
    const upTo = fields.slice(0, index);
    const lineTime = getFieldMinDiff(field);
    return {
      lineTime,
      totalTime:
        upTo.reduce((sum, field) => sum + getFieldMinDiff(field), 0) + lineTime,
    };
  });
}

function useLineTimes(
  control: ReturnType<typeof useTimesheetTableContext>["0"]["form"]["control"]
) {
  const watch = useWatch({
    control,
    name: "Lines",
  });
  const [lineTimes, setLineTimes] = useState<LineTimes[]>([]);

  useEffect(() => {
    const newLines = !watch ? [] : getLineTimes(watch);
    setLineTimes(newLines);
  }, [watch]);

  return lineTimes;
}

export function TimesheetTableTBody() {
  const [
    {
      form,
      isReadOnly,
      isCreateMode,
      grouping,
      categoriesQuery,
      subcategoriesQuery,
      gridTemplateColumns,
    },
  ] = useTimesheetTableContext();
  const {
    fields: lines,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "Lines",
  });
  const lineTimes = useLineTimes(form.control);

  if (lines.length === 0 && !isCreateMode) {
    return (
      <div className="flex flex-col items-center justify-center">
        <em className="not-italic text-2xl my-8 text-gray-500">No Entries</em>
      </div>
    );
  }

  return (
    <>
      <GridNavigation>
        <div className="flex flex-col">
          {lines.map((line, i) => (
            <TimesheetTableRow
              key={line.id ?? `row:${i}`}
              isReadOnly={isReadOnly}
              index={i}
              errors={form.formState.errors.Lines?.[i]}
              grouping={grouping}
              line={line}
              lineTimes={lineTimes[i]}
              control={form.control}
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
              remove={remove}
            />
          ))}
        </div>
      </GridNavigation>
      {!isReadOnly && (
        <footer className="flex items-center justify-end p-2">
          <Button
            disabled={!!form.formState.errors.Lines}
            onClick={() =>
              append({
                categoryId: -1,
                subcategoryId: null,
                note: null,
                startTime: "",
                endTime: "",
              })
            }
          >
            Add
          </Button>
        </footer>
      )}
    </>
  );
}
