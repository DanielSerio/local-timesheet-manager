import type { Category } from "./category.types";
import type { Subcategory } from "./subcategory.types";
import type { Pretty } from "../utility.types";

interface TimesheetLineCreateBasis {
  timesheetId?: number;
  categoryId: number;
  subcategoryId: number | null;
  startTime: string;
  endTime: string;
  note: string | null;
}

export type TimesheetLineCreate = Pretty<TimesheetLineCreateBasis>;

interface TimesheetLineBasis extends TimesheetLineCreateBasis {
  id: number;
  timesheetId: number;
  createdAt: Date;
  lastUpdateAt: Date;

  Category?: Category;
  Subcategory?: Subcategory | null;
}

export type TimesheetLineRecord = Pretty<TimesheetLineBasis>;

interface ComputedTimesheetLineBasis extends TimesheetLineBasis {
  totalTime: number;
  lineTime: number;
}

export type ComputedTimesheetLine = Pretty<ComputedTimesheetLineBasis>;