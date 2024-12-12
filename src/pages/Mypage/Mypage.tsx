import { LoadingBar } from '@/components/Common';
import { MyPageNavBar } from '@/components/MyPage';
import { Bottom, Profile } from '@/components/MyPage/Home';
import useRequireAuth from '@/hooks/useRequireAuth';

const MyPage = () => {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* 상단 네비게이션 */}
      <MyPageNavBar />

      {/* 프로필 정보 */}
      <Profile />

      {/* 하단 메뉴 */}
      <Bottom />
    </div>
  );
};

export default MyPage;
