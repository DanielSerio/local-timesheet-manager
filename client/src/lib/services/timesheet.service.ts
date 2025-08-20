import type { ListResponse } from "../types/response.types";
import type { Timesheet, TimesheetCreate, TimesheetUpdate } from "../types/timesheet.types";
import type { Pretty } from "../types/utility.types";
import { ApiService } from "./api.service";

export interface TimesheetListItem {
  id: number;
  name: string;
  totalTime: number;
}

class TimesheetApiService extends ApiService {
  constructor() {
    super({
      ENDPOINT: '/timesheets'
    });
  }

  async listTimesheetsForDate(entryDate: string) {
    const params = new URLSearchParams({
      date: entryDate,
    });

    return await this.GET<Pretty<ListResponse<TimesheetListItem>>>(`/for-date?${params}`);
  }

  async getTimesheet(timesheetId: number) {
    return await this.GET<Pretty<Timesheet>>(`/${timesheetId}`);
  }

  async createTimesheet(timesheet: TimesheetCreate) {
    return await this.POST<TimesheetCreate, Pretty<Timesheet>>(timesheet);
  }

  async updateTimesheet(timesheet: TimesheetUpdate) {
    return await this.PATCH<TimesheetUpdate, Pretty<Timesheet>>(timesheet);
  }

  async deleteTimesheets(timesheetIds: number[]) {
    return await this.PUT<number[], {
      raw: unknown;
      affected?: number | null | undefined;
    }>(timesheetIds);
  }
}

export const TimesheetService = new TimesheetApiService();