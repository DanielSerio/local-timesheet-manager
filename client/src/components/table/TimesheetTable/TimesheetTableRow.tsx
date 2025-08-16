import { useRef, type PropsWithChildren } from "react";
import { Trash } from "lucide-react";
import { Controller, type FieldError } from "react-hook-form";
import type { TimesheetTableRowProps } from "./TimesheetTable.props";
import { EntitySearch } from "@/components/core/control";
import { TimeInput } from "@/components/core/control";
import { Button } from "@/components/ui/button";
import { formatMinutes } from "./utility";

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
  errors,
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
      <>
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
        {line?.note && (
          <div className="grid" style={{ gridTemplateColumns }}>
            <div className="cell col-span-7 note-cell">{line!.note}</div>
          </div>
        )}
        {errors &&
          Object.keys(errors).length > 0 &&
          Object.values(errors).map((fieldError) => {
            const err = fieldError as FieldError;
            const message = err.message;
            const key = message?.replace(/\s+/g, "_");
            return (
              <div
                className="grid border-b border-destructive bg-destructive/10 text-destructive"
                style={{ gridTemplateColumns }}
                key={key}
              >
                <div className="cell col-span-7 error-cell">{message}</div>
              </div>
            );
          })}
      </>
    );
  }

  return (
    <>
      <TableRow gridTemplateColumns={gridTemplateColumns}>
        <Cell label="Category">
          <Controller
            control={control}
            name={`Lines.${index}.categoryId`}
            render={({ field }) => {
              return (
                <EntitySearch
                  ref={field.ref}
                  entityName="category"
                  defaultValue={field.value ?? null}
                  onSelectId={(id: number) => {
                    if (id) {
                      field.onChange({
                        target: {
                          value: id,
                        },
                      });
                    }

                    console.info("categoryId", id);
                    field.onBlur();
                  }}
                  options={categoriesQuery.data?.records}
                  getOptionValue={(opt) => opt.id}
                  getOptionLabel={(opt) => opt.name}
                />
              );
            }}
          />
        </Cell>
        <Cell label="Subcategory">
          <Controller
            control={control}
            name={`Lines.${index}.subcategoryId`}
            render={({ field }) => {
              return (
                <EntitySearch
                  ref={field.ref}
                  entityName="subcategory"
                  defaultValue={field.value ?? null}
                  onSelectId={(id: number) => {
                    if (id) {
                      field.onChange({
                        target: {
                          value: id,
                        },
                      });
                    }
                    field.onBlur();
                  }}
                  options={subcategoriesQuery.data?.records}
                  getOptionValue={(opt) => opt.id}
                  getOptionLabel={(opt) => opt.name}
                />
              );
            }}
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
          <Button
            size="icon"
            variant="destructive"
            onClick={() => remove(index)}
          >
            <Trash />
          </Button>
        </Cell>
      </TableRow>
      {errors &&
        Object.keys(errors).length > 0 &&
        Object.values(errors).map((fieldError) => {
          const err = fieldError as FieldError;
          const message = err.message;
          const key = message?.replace(/\s+/g, "_");
          return (
            <div
              className="grid border-b border-destructive text-destructive bg-destructive/10 py-1 px-2"
              style={{ gridTemplateColumns }}
              key={key}
            >
              <div className="cell col-span-7 error-cell">{message}</div>
            </div>
          );
        })}
    </>
  );
}
