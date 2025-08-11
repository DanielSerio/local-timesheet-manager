import { useRef, type PropsWithChildren } from "react";
import { Trash } from "lucide-react";
import { Controller } from "react-hook-form";
import type { TimesheetTableRowProps } from "./TimesheetTable.props";
import { EntitySearch } from "@/components/core/control";
import { TimeInput } from "@/components/core/control";
import { Button } from "@/components/ui/button";

function formatMinutes(minutes: number) {
  const hours = ~~(minutes / 60);
  const remainder = minutes % 60;

  const pad = (n: number) => `${n}`.padStart(2, "0");

  return `${pad(hours)}:${pad(remainder)}`;
}

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
  lineTimes,
  isReadOnly,
  gridTemplateColumns,
  index,
  categoriesQuery,
  subcategoriesQuery,
  control,
  remove,
}: TimesheetTableRowProps) {
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);
  if (isReadOnly) {
    return (
      <TableRow gridTemplateColumns={gridTemplateColumns}>
        <Cell label="Category">{line?.categoryId ?? ""}</Cell>
        <Cell label="Subcategory">{line?.subcategoryId ?? ""}</Cell>
        <Cell label="Start Time">{line?.startTime.toString()}</Cell>
        <Cell label="End Time">{line?.endTime.toString()}</Cell>
        <Cell label="Line Time">
          {formatMinutes(lineTimes?.lineTime ? lineTimes.lineTime : 0)}
        </Cell>
        <Cell label="Total Time">
          {formatMinutes(lineTimes?.totalTime ? lineTimes.totalTime : 0)}
        </Cell>
        <Cell label="Actions">
          {isReadOnly ? (
            ""
          ) : (
            <Button size="icon" variant="destructive">
              <Trash />
            </Button>
          )}
        </Cell>
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
        <Controller
          control={control}
          name={`Lines.${index}.startTime`}
          render={({ field }) => {
            return (
              <TimeInput
                ref={startTimeRef}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={() => {
                  if (startTimeRef && startTimeRef.current) {
                    field.value = startTimeRef.current.value;
                  }

                  field.onBlur();
                }}
              />
            );
          }}
        />
      </Cell>
      <Cell label="End Time">
        <Controller
          control={control}
          name={`Lines.${index}.endTime`}
          render={({ field }) => {
            return (
              <TimeInput
                ref={endTimeRef}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={() => {
                  if (endTimeRef && endTimeRef.current) {
                    field.value = endTimeRef.current.value;
                  }

                  field.onBlur();
                }}
              />
            );
          }}
        />
      </Cell>
      <Cell label="Line Time">
        {formatMinutes(lineTimes?.lineTime ? lineTimes.lineTime : 0)}
      </Cell>
      <Cell label="Total Time">
        {formatMinutes(lineTimes?.totalTime ? lineTimes.totalTime : 0)}
      </Cell>
      <Cell label="Actions">
        {isReadOnly ? (
          ""
        ) : (
          <Button
            size="icon"
            variant="destructive"
            onClick={() => remove(index)}
          >
            <Trash />
          </Button>
        )}
      </Cell>
    </TableRow>
  );
}
