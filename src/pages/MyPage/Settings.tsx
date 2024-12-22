import { BackNavBar, Line, LoadingBar, ResponsiveImage } from '@/components/Common';
import { MetaTag } from '@/components/Seo';
import { myPageMetaData } from '@/config/metaData';
import useRequireAuth from '@/hooks/useRequireAuth';
import { Link } from 'react-router-dom';

const Settings = () => {
  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical,
    ogTitle,
    ogDescription,
  } = myPageMetaData.settings;

  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return <LoadingBar />; // 로딩 상태 처리
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
                <div className="w-[30px] h-[30px]">
                  <ResponsiveImage
                    webpSrc="/setting/webp/kakao.webp"
                    pngSrc="/setting/png/kakao.png"
                    alt="언어 아이콘"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-clamp30 font-normal">언어</span>
              </div>
              <div className="flex items-center">
                <span className="text-clamp30 text-[#707070]">한국어</span>
                <div className="w-[15px] h-[15px] ml-1">
                  <ResponsiveImage
                    webpSrc="/setting/webp/arrow_right.webp"
                    pngSrc="/setting/png/arrow_right.png"
                    alt="접속 아이콘"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* 계정 섹션 */}
          <div>
            <h2 className="text-start text-clamp35 font-bold mb-2">계정</h2>
            <Link to="/myPage/account" className="flex justify-between items-center py-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-[30px] h-[30px]">
                  <ResponsiveImage
                    webpSrc="/setting/webp/setting.webp"
                    pngSrc="/setting/png/setting.png"
                    alt="계정 아이콘"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-clamp30 font-normal">계정 설정</span>
              </div>
              <div className="flex items-center">
                <div className="w-[15px] h-[15px] ml-1">
                  <ResponsiveImage
                    webpSrc="/setting/webp/arrow_right.webp"
                    pngSrc="/setting/png/arrow_right.png"
                    alt="접속 아이콘"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
