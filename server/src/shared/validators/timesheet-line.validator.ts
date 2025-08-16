import { isSameMinute, isAfter } from 'date-fns';
import z from "zod";
import { TimesheetLineCreate, TimesheetLineRecord } from "../types/models/timesheet-line.types";


export class TimesheetLineValidator {
  static isValidTime(value: string) {
    const isValidPattern = /\d{2}[:]\d{2}/.test(value);

    if (isValidPattern) {
      const [hStr, mStr] = value.split(':') as [string, string];
      const h = +hStr;
      const m = +mStr;

      return (h >= 0 && h <= 23) && (m >= 0 && m <= 59);
    }

    return false;
  }

  static isValidTimeRange(startTime: string, endTime: string): { success: true; failureReason?: never; } | { success: false; failureReason: string; } {
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

  static getTimeValidator = (path?: PropertyKey[]) => z.string().superRefine((value, ctx) => {
    if (!this.isValidTime(value)) {
      ctx.addIssue({
        code: 'custom',
        message: `Invalid time`,
        path
      });
    }
  });

  static create = z.object({
    categoryId: z.coerce.number<number>().int().positive(),
    subcategoryId: z.coerce.number<number>().int().nullable(),
    startTime: this.getTimeValidator(['startTime']),
    endTime: this.getTimeValidator(['endTime']),
    note: z.string().trim().nullable(),
  } satisfies Record<keyof Omit<TimesheetLineCreate, 'timesheetId' | 'createdAt' | 'lastUpdateAt' | 'Category' | 'Subcategory'>, any>)
    .superRefine((record, ctx) => {
      const result = this.isValidTimeRange(record.startTime, record.endTime);

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

  static update = z.object({
    id: z.number().int().positive(),
    categoryId: z.coerce.number<number>().int().positive(),
    subcategoryId: z.coerce.number<number>().int().nullable(),
    startTime: this.getTimeValidator(['startTime']),
    endTime: this.getTimeValidator(['endTime']),
    note: z.string().trim().nullable(),
  } satisfies Record<keyof Omit<TimesheetLineRecord, 'timesheetId' | 'createdAt' | 'lastUpdateAt' | 'Category' | 'Subcategory'>, any>)
    .superRefine((record, ctx) => {
      const result = this.isValidTimeRange(record.startTime, record.endTime);

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

  static delete = z.number().int().positive();
}