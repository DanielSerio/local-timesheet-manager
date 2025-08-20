import { format as dateFnsFormat } from "date-fns";

export function formatMinutes(minutes: number) {
  const hours = ~~(minutes / 60);
  const remainder = minutes % 60;

  const pad = (n: number) => `${n}`.padStart(2, "0");

  const formattedValue = `${pad(hours)}:${pad(remainder)}`;

  return formattedValue.includes("-") ? "--:--" : formattedValue;
}

type DateFormat = 'date' | 'time-24' | 'time-12' | 'datetime-12' | 'datetime-24';

export interface FormatDateOptions {
  format: DateFormat;
}

/**
 * Gets the template string for date FNS based on a name.
 * @param format - DateFormat {@link DateFormat}
 * @returns string
 */
function getDateFNSFormatString(format: DateFormat) {
  const dateFmt = 'yyyy/MM/dd';

  switch (format) {
    case 'time-12':
      return `hh:mm a`;
    case 'time-24':
      return 'HH:mm';
    case 'datetime-12':
      return `${dateFmt} hh:mm a`;
    case 'datetime-24':
      return `${dateFmt} HH:mm`;
    case 'date':
    default:
      return dateFmt;
  }
}


/**
 * Takes a date object or string and formats it based on the specified format option.
 * @param {Date} date - The `date` parameter in the `formatDate` function can accept a value
 * of type `Date` or `string`. It represents the date that you want to format.
 * @param {FormatDateOptions} options - {@link FormatDateOptions}
 * @property options.format - The format to use. {@link DateFormat}
 * @returns The formatted date
 */
export function formatDate(date: Date | string, { format }: FormatDateOptions = { format: 'date' }) {
  if (typeof date === 'string') {
    date = new Date(Date.parse(date));
  }

  const dateChunks = [
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate()
  ];
  const timeChunks = [
    date.getUTCHours(),
    date.getUTCMinutes()
  ];

  const full = `${dateChunks.join('-')} ${timeChunks.map((n) => `${n}`.padStart(2, '0')).join(':')}`;

  return dateFnsFormat(full, getDateFNSFormatString(format));
}