import { TimesheetTableProvider } from "./TimesheetTable.context";
import type { TimesheetTableProps } from "./TimesheetTable.props";
import { TimesheetTableTBody } from "./TimesheetTableTBody";
import { TimesheetTableTHead } from "./TimesheetTableTHead";
import { TimesheetTableToolbar } from "./TimesheetTableToolbar";

export function TimesheetTable({ children, ...props }: TimesheetTableProps) {
  return (
    <div className="timesheet-table">
      <TimesheetTableProvider {...props}>
        <TimesheetTableToolbar />
        <TimesheetTableTHead />
        <TimesheetTableTBody />
      </TimesheetTableProvider>
    </div>
  );
}
