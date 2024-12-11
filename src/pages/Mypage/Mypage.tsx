import { MyPageNavBar } from '@/components/MyPage';
import { Bottom, Profile } from '@/components/MyPage/Home';
import { userState } from '@/stores/useAuthStore';
import { useRecoilValue } from 'recoil';

const MyPage = () => {
  const myData = useRecoilValue(userState);
  console.log(myData);
  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      {myData && (
        <>
          {/* 상단 네비게이션 */}
          <MyPageNavBar />

          {/* 프로필 정보 */}
          <Profile />

          {/* 하단 메뉴 */}
          <Bottom />
        </>
      )}
    </div>
  );
};

export default MyPage;
