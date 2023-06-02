import * as dayjs from 'dayjs';

export function Add60MinutesToNow() {
  const now = dayjs();
  const newTime = now.add(60, 'minute');
  return newTime.toDate();
}
