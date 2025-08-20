import { createContext, useContext, useEffect, useState } from "react";
import type {
  TimesheetRow,
  TimesheetTableColumnDef,
  TimesheetTableGrouping,
  TimesheetTableProps,
} from "./TimesheetTable.props";
import { useEntityList } from "@/hooks/useEntityList";
import { COLUMNS } from "./columns";
import { useTimesheetForm } from "@/hooks/useTimesheetForm";
import { useTimesheet } from "@/hooks/useTimesheet";
import type { Timesheet } from "@/lib/types/timesheet.types";

export function calculateGridTemplateColumns(
  columns: TimesheetTableColumnDef<keyof TimesheetRow>[]
) {
  const total = columns.reduce((sum, column) => sum + column.size, 0);

  return columns
    .map((col) => `${((col.size / total) * 100).toFixed(2)}%`)
    .join(" ");
}

function useTimesheetTableState({
  isReadOnly: defaultIsReadOnly,
  grouping: defaultGrouping,
  isCreateMode,
  timesheetId,
}: TimesheetTableProps) {
  const [isReadOnly, setIsReadOnly] = useState(defaultIsReadOnly ?? true);
  const [grouping, setGrouping] = useState<TimesheetTableGrouping>(
    defaultGrouping ?? "none"
  );

  const categoriesQuery = useEntityList({
    entity: "categories",
    limit: 10_000,
    offset: 0,
  });
  const subcategoriesQuery = useEntityList({
    entity: "subcategories",
    limit: 10_000,
    offset: 0,
  });
  const timesheetQuery = useTimesheet(timesheetId);
  const returnData = timesheetQuery.data;

  const timesheet = (returnData as unknown as Record<string, unknown>)?.data
    ? (returnData as { data: Timesheet }).data
    : returnData;

  const form = useTimesheetForm(timesheet as Timesheet | undefined);

  useEffect(() => {
    if (typeof defaultIsReadOnly === "boolean") {
      setIsReadOnly(defaultIsReadOnly);
    }
  }, [defaultIsReadOnly]);

  useEffect(() => {
    if (defaultGrouping !== undefined) {
      setGrouping(defaultGrouping);
    }
  }, [defaultGrouping]);

  const state = {
    timesheetId,
    timesheetQuery,
    isCreateMode: isCreateMode ?? false,
    isReadOnly: isCreateMode ? false : isReadOnly,
    grouping,
    categoriesQuery,
    subcategoriesQuery,
    columns: COLUMNS,
    form,
    gridTemplateColumns: calculateGridTemplateColumns(COLUMNS),
  };

  const methods = {
    setIsReadOnly,
    setGrouping,
  };

  return [state, methods] as const;
}

export type UseTimesheetTable = ReturnType<typeof useTimesheetTableState>;

const TimesheetTableContext = createContext<null | UseTimesheetTable>(null);

export const TimesheetTableProvider = ({
  children,
  ...props
}: TimesheetTableProps) => {
  const state = useTimesheetTableState({ ...props });

  return (
    <TimesheetTableContext.Provider value={state}>
      {children}
    </TimesheetTableContext.Provider>
  );
};

export const useTimesheetTableContext = () => {
  if (TimesheetTableContext === null) {
    throw new Error(
      `useTimesheetTableContext must be used within a TimesheetTableProvider`
    );
  }

  return useContext(TimesheetTableContext)!;
};
