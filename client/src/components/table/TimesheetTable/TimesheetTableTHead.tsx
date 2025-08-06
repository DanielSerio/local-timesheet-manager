import { COLUMNS } from "./columns";
import { useTimesheetTableContext } from "./TimesheetTable.context";

export function TimesheetTableTHead() {
  const [{ isReadOnly, grouping, gridTemplateColumns }] =
    useTimesheetTableContext();
  return (
    <div
      className="thead text-sm font-semibold text-gray-500"
      style={{ gridTemplateColumns }}
    >
      {COLUMNS.map((col) => (
        <span key={col.id} className="w-full text-center">
          {col.header}
        </span>
      ))}
    </div>
  );
}
