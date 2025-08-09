import { Link } from "@tanstack/react-router";
import type { EntryDateListProps } from "./EntryDateList.props";
import type { PropsWithChildren } from "react";
import { ApiTable } from "@/components/table";
import { IDCell } from "@/components/table/cell/IDCell";
import { CountCell } from "@/components/table/cell/CountCell";

const ListLink = ({
  children,
  entryDate,
}: PropsWithChildren<{ entryDate: Date | string }>) => {
  return (
    <Link to="/$entryDate" params={{ entryDate: `${entryDate}` }}>
      {children}
    </Link>
  );
};

const getDateLink =
  (entryDate: Date | string) =>
  ({ children }: PropsWithChildren) => (
    <ListLink entryDate={entryDate}>{children}</ListLink>
  );

export function EntryDateList({ query }: EntryDateListProps) {
  return (
    <ApiTable
      isLoading={query.isLoading}
      data={query.data}
      error={query.error}
      columns={[
        {
          id: "date",
          header: "Date",
          size: 120,
          accessorKey: "entryDate",
          cell(props) {
            const entryDate = props.getValue() as string | Date;
            const DateLink = getDateLink(entryDate);

            return <DateLink>{`${entryDate}`}</DateLink>;
          },
        },
        {
          id: "count",
          header: "Timesheets",
          accessorKey: "count",
          size: 60,
          cell: CountCell,
        },
      ]}
    />
  );
}
