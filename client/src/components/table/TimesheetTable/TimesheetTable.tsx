import { TimesheetTableProvider } from "./TimesheetTable.context";
import type { TimesheetTableProps } from "./TimesheetTable.props";
import { TimesheetTableTBody } from "./TimesheetTableTBody";
import { TimesheetTableTHead } from "./TimesheetTableTHead";
import { TimesheetTableToolbar } from "./TimesheetTableToolbar";
//TODO: Focus first select of new row when adding timesheet rows
//TODO: Different view modes (groupings)

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
