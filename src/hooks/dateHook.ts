import dayjs from 'dayjs';

export const todayDate = () => {
  const today = dayjs().format('YYYY-MM-DD');

  return today;
};
