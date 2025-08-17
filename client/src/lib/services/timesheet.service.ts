import type { ListResponse } from "../types/response.types";
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

    const response = await fetch(`${this._URL}/for-date/?${params}`);

    if (response.status >= 400) {
      throw await response.json();
    }

    return await response.json() as Pretty<ListResponse<TimesheetListItem>>;
  }
}

export const TimesheetService = new TimesheetApiService();