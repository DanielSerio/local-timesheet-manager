import { isAfter, isSameMinute } from "date-fns";



export function isValidTimeRange(startTime: string, endTime: string): { success: true; failureReason?: never; } | { success: false; failureReason: string; } {
  const date = '2024-12-12';
  const startDate = new Date(`${date}T${startTime}`);
  const endDate = new Date(`${date}T${endTime}`);

  if (isSameMinute(startDate, endDate)) {
    return {
      success: false,
      failureReason: 'End time cannot be the same as start time'
    };
  }

  if (isAfter(startDate, endDate)) {
    return {
      success: false,
      failureReason: 'Start time cannot be after end time'
    };
  }

  return {
    success: true
  };
}