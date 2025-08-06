import type { PropsWithChildren } from "react";
import type { TimesheetTableRowProps } from "./TimesheetTable.props";
import { EntitySearch } from "@/components/core/control/EntitySearch/Entitysearch";
import { TimeInput } from "@/components/core/control";

function Cell({ children, label }: PropsWithChildren<{ label: string }>) {
  return (
    <div className="flex justify-between">
      <span className="label p-2">{label}</span>
      <span className="value p-2">{children}</span>
    </div>
  );
}

function TableRow({
  children,
  gridTemplateColumns,
}: PropsWithChildren<{ gridTemplateColumns: string }>) {
  return (
    <div className="flex row border-b" style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
}

export function TimesheetTableRow({
  line,
  isReadOnly,
  gridTemplateColumns,
  grouping,
  categoriesQuery,
  subcategoriesQuery,
}: TimesheetTableRowProps) {
  if (isReadOnly) {
    return (
      <TableRow gridTemplateColumns={gridTemplateColumns}>
        <Cell label="Category">{line?.categoryId ?? ""}</Cell>
        <Cell label="Subcategory">{line?.subcategoryId ?? ""}</Cell>
        <Cell label="Start Time">{line?.startTime.toString()}</Cell>
        <Cell label="End Time">{line?.endTime.toString()}</Cell>
        <Cell label="Line Time">00:00</Cell>
        <Cell label="Total Time">00:00</Cell>
        <Cell label="Actions">{isReadOnly ? "" : <button>del</button>}</Cell>
      </TableRow>
    );
  }

  return (
    <TableRow gridTemplateColumns={gridTemplateColumns}>
      <Cell label="Category">
        <EntitySearch
          entityName="category"
          defaultValue={line?.categoryId ?? null}
          options={categoriesQuery.data?.records}
          getOptionValue={(opt) => opt.id}
          getOptionLabel={(opt) => opt.name}
        />
      </Cell>
      <Cell label="Subcategory">
        <EntitySearch
          entityName="subcategory"
          defaultValue={line?.subcategoryId ?? null}
          options={subcategoriesQuery.data?.records}
          getOptionValue={(opt) => opt.id}
          getOptionLabel={(opt) => opt.name}
        />
      </Cell>
      <Cell label="Start Time">
        <TimeInput value={line?.startTime.toString()} onChange={console.info} />
      </Cell>
      <Cell label="End Time">
        <TimeInput value={line?.endTime.toString()} onChange={console.info} />
      </Cell>
      <Cell label="Line Time">00:00</Cell>
      <Cell label="Total Time">00:00</Cell>
      <Cell label="Actions">{isReadOnly ? "" : <button>del</button>}</Cell>
    </TableRow>
  );
}
