import { Link } from "@tanstack/react-router";
import type { EntryDateListProps } from "./EntryDateList.props";
import type { PropsWithChildren } from "react";

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
    <>
      {query.isLoading && <p>Loading...</p>}
      {!query.isLoading && !!query.isError && <p>query.error.message</p>}
      {!query.isLoading &&
        query.data?.records.length &&
        query.data!.records.map(({ count, entryDate }) => {
          const DateLink = getDateLink(entryDate);

          return (
            <div className="flex justify-between" key={`${entryDate}`}>
              <DateLink>{`${entryDate}`}</DateLink>
              <DateLink>({count})</DateLink>
            </div>
          );
        })}
    </>
  );
}
