import { Button } from "@/components/ui/button";
import { useTimesheetTableContext } from "./TimesheetTable.context";
import { CancelGroupButton } from "@/components/core/button/CancelGroupButton";
import { useCallback } from "react";

export function TimesheetTableToolbar() {
  const [{ isReadOnly, grouping }, { setIsReadOnly }] =
    useTimesheetTableContext();

  const setIsExposed = useCallback(
    (value: boolean) => {
      if (value) {
        setIsReadOnly(false);
      } else {
        setIsReadOnly(true);
      }
    },
    [setIsReadOnly]
  );

  return (
    <div className="flex justify-end items-center p-2 border-b">
      <CancelGroupButton
        initButton={{ buttonText: "Edit" }}
        isExposed={!isReadOnly}
        setIsExposed={setIsExposed}
      >
        <Button>Save</Button>
      </CancelGroupButton>
    </div>
  );
}
