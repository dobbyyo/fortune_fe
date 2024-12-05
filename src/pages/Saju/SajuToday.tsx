import { NavBar } from '@/components/Common';
import { HeaderInfo, ItemList, ResultButton } from '@/components/Saju/SajuToday';

const SajuToday = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar title="오늘의 사주" isResult={false} />
      <HeaderInfo />
      <ItemList />
      <ResultButton />
    </div>
  );
};

export default SajuToday;
