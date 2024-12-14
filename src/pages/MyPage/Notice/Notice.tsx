import { BackNavBar, Line, LoadingBar } from '@/components/Common';
import { NoticeModal } from '@/components/MyPage/Notice';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import { todayDate } from '@/hooks/dateHook';
import { useGetNotice } from '@/services/queries/myPage.query';
import { GetNoticeData } from '@/types/myPageType';
import dayjs from 'dayjs';
import { useState } from 'react';

const Notice = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.notice;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<GetNoticeData | null>(null);

  const today = todayDate();
  const {
    data: noticeData,
    isLoading,
    isError,
  } = useGetNotice({
    start_date: '2024-01-01',
    end_date: today,
    page: 1,
    limit: 10,
  });
  // 모달 열기 핸들러
  const openModal = (notice: GetNoticeData) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const closeModal = () => {
    setSelectedNotice(null);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <LoadingBar />;
  }

  if (isError || !noticeData) {
    return <div>Error loading notices</div>;
  }

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
        <BackNavBar title="공지사항" />

        <Line />
        <div className="w-full px-4">
          {noticeData.information.map((notice) => (
            <div key={notice.id} className="py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-clamp35 font-medium ">{notice.title}</h3>
                <button onClick={() => openModal(notice)} className="w-[35px] h-[35px]">
                  <img src="/common/bottomArrow-icon.jpg" className="w-[35px] h-[35px]" />
                </button>
              </div>
              <p className="text-clamp30 font-normal text-start text-gray-400">
                {dayjs(notice.created_at).format('YYYY.MM.DD')}
              </p>
            </div>
          ))}
        </div>

        {isModalOpen && selectedNotice && (
          <NoticeModal open={isModalOpen} selectedNotice={selectedNotice} close={closeModal} />
        )}
      </div>
    </>
  );
};

export default Notice;
