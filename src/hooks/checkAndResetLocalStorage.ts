import { getLocalStorage } from '@/lib/localStorage';
import { todayDate } from './dateHook';

const checkAndResetLocalStorage = (key: string) => {
  const savedData = getLocalStorage(key);
  const today = todayDate();

  if (savedData) {
    if (savedData.date !== today) {
      // 저장된 날짜가 오늘과 다르면 초기화
      localStorage.removeItem(key);
      return null;
    }
    return savedData; // 저장된 데이터 반환
  }
  return null; // 저장된 데이터 없음
};

export default checkAndResetLocalStorage;
