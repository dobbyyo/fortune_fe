import { userState } from '@/stores/useAuthStore';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import BirthInfoModal from './BirthInfoModal';
import LogoutModal from '../LogoutModal';
import { ResponsiveImage } from '@/components/Common';

const Profile = () => {
  const myData = useRecoilValue(userState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const onOpenLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const onCloseLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  return (
    <div className="w-full mt-8 flex flex-col items-center">
      {myData && (
        <>
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-gray-300">
            <img src={myData.profile.profile_url} alt="프로필 사진" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-4 text-[20px] sm:text-[30px] font-bold">{myData.username}</h2>
          <div
            onClick={() => setModalOpen(true)}
            className="relative flex justify-center items-center cursor-pointer my-2"
          >
            <span className="text-[15px] sm:text-[20px] font-medium">생일관리</span>

            <div className="absolute right-[-50px] w-[30px] h-[30px]">
              <ResponsiveImage
                webpSrc="/profile/webp/arrow_right.webp"
                pngSrc="/profile/png/arrow_right.png"
                alt="right icon"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <BirthInfoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

          <button
            onClick={onOpenLogoutModal}
            className="mt-2 px-6 py-2 rounded-full bg-[#a47af1] text-white font-medium"
          >
            로그아웃
          </button>
          {isLogoutModalOpen && <LogoutModal isOpen={isLogoutModalOpen} onClose={onCloseLogoutModal} />}
        </>
      )}
    </div>
  );
};

export default Profile;
