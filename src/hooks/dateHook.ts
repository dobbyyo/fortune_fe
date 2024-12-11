import { timeOptions } from '@/config/dateSaju';
import dayjs from 'dayjs';

export const todayDate = () => {
  const today = dayjs().format('YYYY-MM-DD');

  return today;
};

export const matchBirthTime = (birthTime: string) => {
  return timeOptions.find((option) => {
    const [start, end] = option.value.split('-');
    const [birthHour, birthMinute] = birthTime.split(':').map(Number);

    const startTime = start.split(':').map(Number);
    const endTime = end.split(':').map(Number);

    const startMinutes = startTime[0] * 60 + startTime[1];
    const endMinutes = endTime[0] * 60 + endTime[1];
    const birthMinutes = birthHour * 60 + birthMinute;

    // Handle time range that spans midnight
    if (startMinutes > endMinutes) {
      return (
        (birthMinutes >= startMinutes && birthMinutes <= 1439) || // After start time and before midnight
        (birthMinutes >= 0 && birthMinutes <= endMinutes) // After midnight and before end time
      );
    }
    return birthMinutes >= startMinutes && birthMinutes <= endMinutes;
  });
};

export const generateTimeOptions = () => {
  return Array.from({ length: 24 }, (_, hour) => {
    return Array.from({ length: 60 }, (_, minute) => {
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;
    });
  }).flat(); // 2D 배열을 1D 배열로 변환
};
