import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import useRequireAuth from '@/hooks/useRequireAuth';

const Language = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return (
    <div className="w-full h-full flex flex-col items-center mt-10">
      <BackNavBar title="언어" />

      <Line />

      <div className="w-full p-4 space-y-4">
        <div className="flex justify-between  items-center py-4 border-b">
          <span className="text-clamp35 font-bold">한국어</span>
          <img src="/myPage/redCheck-icon.jpg" alt="선택된 확인 아이콘" className="w-[35px] h-[35px] mr-4" />
        </div>
      </div>
    </div>
  );
};

export default Language;
