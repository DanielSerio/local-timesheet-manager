import { PageTitle } from "@/components/layout/Page/PageTitile";
import { CollectionListSearch } from "@/components/modules/Collections";
import { CountCell } from "@/components/table/cell/CountCell";
import { Button } from "@/components/ui/button";
import { useReportCollectionList } from "@/hooks/useReportCollectionList";
import { useTimesheetCollectionList } from "@/hooks/useTimesheetCollectionList";
import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

const ListLink = ({
  children,
  entryDate,
}: PropsWithChildren<{ entryDate: Date | string }>) => {
  return (
    <Link to="/timesheets/$entryDate" params={{ entryDate: `${entryDate}` }}>
      {children}
    </Link>
  );
};

const getDateLink =
  (entryDate: Date | string) =>
  ({ children }: PropsWithChildren) => (
    <ListLink entryDate={entryDate}>{children}</ListLink>
  );

export function CollectionsListPage() {
  const [
    { inputRef: timesheetsInputRef, entryDateListQuery },
    { onSearchKeyDown: timesheetsOnSearchKeyDown },
  ] = useTimesheetCollectionList();

  const [
    { inputRef: reportsInputRef, reportsListQuery },
    { onSearchKeyDown: reportsOnSearchKeyDown },
  ] = useReportCollectionList();

  return (
    <>
      <PageTitle text="Collections">
        <div className="flex gap-2">
          <Link to="/timesheets/create" className="flex-1 flex">
            <Button className="flex-1">Create Timesheet</Button>
          </Link>
          <Link to="/timesheets/create" className="flex-1 flex">
            <Button className="flex-1">Create Report</Button>
          </Link>
        </div>
      </PageTitle>

      <CollectionListSearch
        inputRef={timesheetsInputRef}
        query={entryDateListQuery}
        prompt="Search Timesheet Collections..."
        onSearchKeyDown={timesheetsOnSearchKeyDown}
        columns={[
          {
            id: "date",
            header: "Date",
            size: 200,
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

      <CollectionListSearch
        inputRef={reportsInputRef}
        query={reportsListQuery}
        prompt="Search Report Collections..."
        onSearchKeyDown={reportsOnSearchKeyDown}
        columns={[
          {
            id: "generatedOn",
            header: "Generated",
            size: 200,
            accessorKey: "generatedOn",
          },
          {
            id: "count",
            header: "Reports",
            size: 60,
            accessorKey: "count",
            cell: CountCell,
          },
        ]}
      />
    </>
  );
}
