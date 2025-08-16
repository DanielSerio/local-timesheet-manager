import { z } from 'zod';
import type { TimesheetLine } from '../types/timesheet-line.types';
import { isValidTimeRange } from '../validators/is-valid-time-range';
import { hasNoTimeOverlap } from '../validators/has-no-time-overlap';

const optionalId = z.number().int().nullable().optional();

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
  subcategoryId: z.coerce.number<number>().int().nullable(),
  startTime: getTimeValidator(['startTime']),
  endTime: getTimeValidator(['startTime']),
  note: z.string().trim().nullable(),
} satisfies Record<keyof Omit<TimesheetLine, 'timesheetId' | 'createdAt' | 'lastUpdateAt' | 'Category' | 'Subcategory'>, any>)
  .superRefine((record, ctx) => {
    const result = isValidTimeRange(record.startTime, record.endTime);

    if (result.success === false) {
      const message = `${result.failureReason}(${record.startTime} - ${record.endTime})`;

      ctx.addIssue({
        code: 'custom',
        message,
        path: ['startTime']
      });
      ctx.addIssue({
        code: 'custom',
        message,
        path: ['endTime']
      });
    }
  });

export const TimesheetSchema = z.object({
  id: optionalId,
  name: z.string().trim().min(1).max(64),
  date: z.coerce.date(),
  Lines: z.array(TimesheetLineSchema).optional()
})
  .superRefine((record, ctx) => {
    const result = hasNoTimeOverlap(record.Lines ?? []);

    if ((record.Lines ?? []).length < 1) {
      ctx.addIssue({
        code: 'custom',
        message: 'at least one line is required for a timesheet',
        path: ['Lines']
      });
    }

    if (result.success === false) {
      const [first, second] = result.failureRows;
      const message = `Intervals overlap: (Line ${first}, Line ${second})`;

      const addIssues = (index: number) => {
        const params: Parameters<typeof ctx.addIssue>[0] = {
          code: 'custom',
          message,
        };
        ctx.addIssue({
          ...params,
          path: ['Lines', index, 'startTime']
        });
        ctx.addIssue({
          ...params,
          path: ['Lines', index, 'endTime']
        });
      };

      addIssues(first);
      addIssues(second);
    }
  });