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

  async createTimesheet(body: TimesheetCreate) {
    return await this.POST<TimesheetCreate, Pretty<Timesheet>>(body);
  }

  async updateTimesheet(body: TimesheetUpdate) {
    return await this.PATCH<TimesheetUpdate, Pretty<Timesheet>>(body);
  }
}

export const TimesheetService = new TimesheetApiService();