import { z } from 'zod';
import type { TimesheetLine } from '../types/timesheet-line.types';

const optionalId = z.number().int().positive().nullable().optional();

function isValidTime(value: string) {
  const isValidPattern = /\d{2}[:]\d{2}/.test(value);

  if (isValidPattern) {
    const [hStr, mStr] = value.split(':') as [string, string];
    const h = +hStr;
    const m = +mStr;

    return (h >= 0 && h <= 23) && (m >= 0 && m <= 59);
  }

  return false;
}

const getTimeValidator = (path?: PropertyKey[]) => z.string().superRefine((value, ctx) => {
  if (!isValidTime(value)) {
    ctx.addIssue({
      code: 'custom',
      message: `Invalid time`,
      path
    });
  }
});

export const TimesheetLineSchema = z.object({
  id: optionalId,
  categoryId: z.coerce.number<number>().int().positive(),
  subcategoryId: z.coerce.number<number>().int().positive(),
  startTime: getTimeValidator(['startTime']),
  endTime: getTimeValidator(['startTime']),
  note: z.string().trim().nullable(),
} satisfies Record<keyof Omit<TimesheetLine, 'timesheetId' | 'createdAt' | 'lastUpdateAt' | 'Category' | 'Subcategory'>, any>);

export const TimesheetSchema = z.object({
  id: optionalId,
  name: z.string().trim().min(1).max(64),
  date: z.iso.date(),
  Lines: z.array(TimesheetLineSchema)
});