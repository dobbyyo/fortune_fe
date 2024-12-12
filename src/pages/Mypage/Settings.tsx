import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import useRequireAuth from '@/hooks/useRequireAuth';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <BackNavBar title={'설정'} />
      <Line />
      {/* 본문 */}
      <div className="p-4 w-full">
        {/* 설정 섹션 */}
        <div className="mb-4">
          <h2 className="text-start text-clamp35 font-bold mb-2">설정</h2>
          <Link to="/myPage/language" className="flex justify-between items-center py-4 border-b">
            <div className="flex items-center space-x-3">
              <img src="/myPage/kakao-icon.jpg" alt="언어 아이콘" className="w-[30px] h-[30px]" />
              <span className="text-clamp30 font-normal">언어</span>
            </div>
            <div className="flex items-center">
              <span className="text-clamp30 text-[#707070]">한국어</span>
              <img src="/common/right-icon.jpg" alt="접속 아이콘" className="w-[30px] h-[30px]" />
            </div>
          </Link>
        </div>

        {/* 계정 섹션 */}
        <div>
          <h2 className="text-start text-clamp35 font-bold mb-2">계정</h2>
          <Link to="/myPage/account" className="flex justify-between items-center py-4 border-b">
            <div className="flex items-center space-x-3">
              <img src="/myPage/setting-icon.jpg" alt="계정 설정 아이콘" className="w-[30px] h-[30px]" />
              <span className="text-clamp30 font-normal">계정 설정</span>
            </div>
            <div className="flex items-center">
              <img src="/common/right-icon.jpg" alt="접속 아이콘" className="w-[30px] h-[30px]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
