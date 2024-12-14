import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import LogoutModal from '@/components/MyPage/LogoutModal';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.account;

  const { isLoading } = useRequireAuth();
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const onOpenLogoutModal = () => {
    setModalOpen(true);
  };

  const onCloseLogoutModal = () => {
    setModalOpen(false);
  };

  // 탈퇴하기 페이지 이동
  const goWithdrawal = () => {
    navigate('/myPage/withdrawal');
  };
  return (
    <>
      <MetaTag
        title={metaTitle}
        description={metaDescription}
        keywords={keywords}
        canonical={canonical}
        ogTitle={ogTitle}
        ogDescription={ogDescription}
      />
      <div className="w-full h-full flex flex-col items-center mt-10">
        {/* 헤더 */}
        <BackNavBar title="계정 설정" />

        <Line />

        {/* 로그아웃 모달 */}
        {isModalOpen && <LogoutModal isOpen={isModalOpen} onClose={onCloseLogoutModal} />}

        <div className="w-full p-4 space-y-4">
          {/* 카카오 연결 */}
          <div className="flex items-center py-4 border-b">
            <img src="/myPage/yellowKakao-icon.jpg" alt="카카오 아이콘" className="w-[35px] h-[35px] mr-4" />
            <span className="text-clamp35 font-normal">카카오톡으로 연결됨</span>
          </div>

          {/* 로그아웃 */}
          <button className="flex items-center w-full py-4 border-b" onClick={onOpenLogoutModal}>
            <img src="/myPage/logout-icon.jpg" alt="로그아웃 아이콘" className="w-[35px] h-[35px] mr-4" />
            <span className="text-clamp35 font-normal">로그아웃</span>
          </button>

          {/* 탈퇴하기 */}
          <button className="flex items-center w-full py-4" onClick={goWithdrawal}>
            <img src="/myPage/ghost-icon.jpg" alt="탈퇴하기 아이콘" className="w-[35px] h-[35px] mr-4" />
            <span className="text-clamp35 font-normal">탈퇴하기</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Account;
