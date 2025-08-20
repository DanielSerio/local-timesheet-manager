import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimesheetSchema } from "@/lib/schemas/timesheet.schema";
import type z from "zod";
import { useEffect } from "react";

export function useTimesheetForm(
  defaultValues?: z.infer<typeof TimesheetSchema>
) {
  const form = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: zodResolver(TimesheetSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      console.info("form values", defaultValues);
      form.reset(defaultValues);
    }
  }, [defaultValues]);

  return form;
}

export type UseTimesheetForm = ReturnType<typeof useTimesheetForm>;
