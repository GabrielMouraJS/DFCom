import * as dayjs from 'dayjs';

export function IsExpired(expiry: Date) {
  const now = dayjs();
  return now.isAfter(dayjs(expiry));
}
