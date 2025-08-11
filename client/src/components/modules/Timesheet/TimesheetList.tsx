import { ApiTable } from "@/components/table";
import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import type { TimesheetListProps } from "./TimesheetList.props";
import { CountCell } from "@/components/table/cell/CountCell";

const ListLink = ({
  children,
  entryDate,
  timesheetId,
}: PropsWithChildren<{ entryDate: Date | string; timesheetId: string }>) => {
  return (
    <Link
      to="/$entryDate/$timesheetId"
      params={{ entryDate: `${entryDate}`, timesheetId }}
    >
      {children}
    </Link>
  );
};

const getLink =
  (entryDate: Date | string) =>
  ({
    children,
    timesheetId,
  }: PropsWithChildren<{ timesheetId: number | string }>) => (
    <ListLink entryDate={entryDate} timesheetId={`${timesheetId}`}>
      {children}
    </ListLink>
  );

export function TimesheetList({ query, entryDate }: TimesheetListProps) {
  return (
    <ApiTable
      isLoading={query.isLoading}
      data={query.data}
      error={query.error}
      columns={[
        {
          id: "name",
          header: "Name",
          size: 240,
          accessorFn(props) {
            return {
              name: props.name,
              timesheetId: props.id,
            };
          },
          cell(props) {
            const { name, timesheetId } = props.getValue();
            const TimesheetLink = getLink(entryDate);

            return (
              <TimesheetLink timesheetId={timesheetId}>{name}</TimesheetLink>
            );
          },
        },
        {
          id: "totalTime",
          header: "Total Time",
          accessorKey: "totalTime",
          size: 60,
          cell: CountCell,
        },
      ]}
    />
  );
}
