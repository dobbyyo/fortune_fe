import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutModal from '../MyPage/LogoutModal';
import { useRecoilValue } from 'recoil';
import { authState } from '@/stores/useAuthStore';
import { useMyDataQuery } from '@/services/queries/user.query';

const RightHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useRecoilValue(authState);

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  const goMyPage = () => {
    navigate('/myPage');
  };
  const { data: userData, isLoading } = useMyDataQuery({
    enabled: auth.isAuthenticated,
  });

  return (
    <div className="flex justify-center items-center">
      {auth.isAuthenticated && userData ? (
        <>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar w-[36px] h-[36px] sm:w-[46px] sm:h-[46px] md:w-[56px] md:h-[56px]"
            >
              <div className="rounded-full w-[30px] h-[30px] sm:w-[46px] sm:h-[46px]">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 rounded-full animate-pulse" />
                ) : (
                  <img
                    alt="사용자 프로필 이미지"
                    src={userData.myInfo.profile.profile_url || '/default-profile.png'} // 기본 이미지 경로 제공
                    className="w-full h-full cursor-pointer"
                    onClick={goMyPage}
                  />
                )}
              </div>
            </div>
          </div>
          <button onClick={openLogoutModal} className="header-btn">
            로그아웃
          </button>
        </>
      ) : (
        <Link to={'/login'} className="header-btn">
          로그인
        </Link>
      )}

      {isModalOpen && <LogoutModal isOpen={isModalOpen} onClose={closeLogoutModal} />}
    </div>
  );
};

export default RightHeader;
