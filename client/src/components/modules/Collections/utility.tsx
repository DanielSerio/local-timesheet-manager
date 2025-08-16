import { Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

const ListLink = ({
  children,
  date,
  scope,
}: PropsWithChildren<{
  date: Date | string;
  scope: "timesheets" | "reports";
}>) => {
  if (scope === "reports") {
    return (
      <Link to="/reports/$generatedOn" params={{ generatedOn: `${date}` }}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/timesheets/$entryDate" params={{ entryDate: `${date}` }}>
      {children}
    </Link>
  );
};

export const getDateLink =
  (date: Date | string, scope: "timesheets" | "reports") =>
  ({ children }: PropsWithChildren) => (
    <ListLink date={date} scope={scope}>
      {children}
    </ListLink>
  );
