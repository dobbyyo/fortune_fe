import { MyPageNavBar } from '@/components/MyPage';
import { userState } from '@/stores/useAuthStore';
import { useRecoilValue } from 'recoil';

const MyPage = () => {
  const myData = useRecoilValue(userState);

  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      {myData && (
        <>
          {/* 상단 네비게이션 */}
          <MyPageNavBar />

          {/* 프로필 정보 */}
          <div className="mt-8 flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-300">
              <img src={myData.profile.profile_url} alt="프로필 사진" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-4 text-lg font-bold">{myData.username}</h2>
            <button className="mt-2 px-6 py-2 rounded-full bg-[#a47af1] text-white font-medium">
              {myData.id ? '로그아웃' : '로그인'}
            </button>
          </div>

          {/* 하단 메뉴 */}
          <div className="mt-10 w-full border-t flex justify-around py-4">
            <button className="flex flex-col items-center">
              <img src="/common/speaker-icon.jpg" alt="공지사항" className="w-6 h-6 mb-2" />
              <span className="text-clamp30 font-normal">공지사항</span>
            </button>
            <button className="flex flex-col items-center">
              <img src="/common/mail-icon.jpg" alt="개발자에게" className="w-6 h-6 mb-2" />
              <span className="text-clamp30 font-normal">개발자에게</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPage;
