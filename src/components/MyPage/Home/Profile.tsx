import { userState } from '@/stores/useAuthStore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import BirthInfoModal from './BirthInfoModal';

const Profile = () => {
  const myData = useRecoilValue(userState);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full mt-8 flex flex-col items-center">
      {myData && (
        <>
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-300">
            <img src={myData.profile.profile_url} alt="프로필 사진" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-4 text-clamp30 font-bold">{myData.username}</h2>
          <div
            onClick={() => setModalOpen(true)}
            className="relative flex justify-center items-center cursor-pointer my-2"
          >
            <span className="text-clamp25 font-medium">생일관리</span>
            <img
              src="/common/right-icon.jpg"
              alt="right icon"
              className="absolute right-[-50px]
          w-[30px] h-[30px] sm:w-[48px] sm:h-[48px]"
            />
          </div>

          <BirthInfoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

          <button className="mt-2 px-6 py-2 rounded-full bg-[#a47af1] text-white font-medium">로그아웃</button>
        </>
      )}
    </div>
  );
};

export default Profile;
