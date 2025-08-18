import { TimesheetService } from "@/lib/services/timesheet.service";
import { useMutation } from "@tanstack/react-query";
import type {
  TimesheetCreate,
  TimesheetUpdate,
} from "../lib/types/timesheet.types";

export interface TimesheetCreateMutationParams {
  /** Invalidate the list query, or any other queries affected */
  invalidate: () => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
export interface TimesheetUpdateMutationParams
  extends TimesheetCreateMutationParams {
  timesheetId?: number;
}

export const useCreateTimesheet = ({
  invalidate,
  onSuccess,
  onError,
}: TimesheetCreateMutationParams) =>
  useMutation({
    mutationKey: ["timesheet", "create"],
    async mutationFn(timesheet: TimesheetCreate) {
      return await TimesheetService.createTimesheet(timesheet);
    },
    async onSuccess() {
      await invalidate();
      onSuccess?.();
    },
    onError(error) {
      onError?.(error);
    },
  });

export const useUpdateTimesheet = ({
  timesheetId,
  invalidate,
  onSuccess,
  onError,
}: TimesheetUpdateMutationParams) =>
  useMutation({
    mutationKey: ["timesheet", timesheetId, "update"],
    async mutationFn(timesheet: Omit<TimesheetUpdate, "id">) {
      if (!timesheetId) {
        throw new Error(`No timesheetId provided`);
      }

      return await TimesheetService.updateTimesheet({
        id: timesheetId,
        ...timesheet,
      });
    },
    async onSuccess() {
      await invalidate();
      onSuccess?.();
    },
    onError(error) {
      onError?.(error);
    },
  });

export const useDeleteTimesheets = () =>
  useMutation({
    mutationKey: ["timesheet", "delete", "many"],
    async mutationFn(timesheetIds: number[]) {
      return await TimesheetService.deleteTimesheets(timesheetIds);
    },
  });
