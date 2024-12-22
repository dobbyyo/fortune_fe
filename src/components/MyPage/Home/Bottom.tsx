import { ResponsiveImage } from '@/components/Common';
import { useNavigate } from 'react-router-dom';

const Bottom = () => {
  const navigate = useNavigate();

  const onClickPage = (page: string) => {
    navigate(page);
  };

  return (
    <div className="mt-10 w-full border-t-8 flex justify-center gap-10 py-4">
      <button className="flex flex-col items-center" onClick={() => onClickPage('/myPage/notice')}>
        <div className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] mb-2">
          <ResponsiveImage
            webpSrc="/profile/webp/speaker.webp"
            pngSrc="/profile/png/speaker.png"
            alt="공지사항"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-clamp30 font-normal">공지사항</span>
      </button>

      <button className="flex flex-col items-center" onClick={() => onClickPage('/myPage/bookmark')}>
        <div className="w-[25px] h-[25px] sm:w-[45px] sm:h-[45px] mb-2">
          <ResponsiveImage
            webpSrc="/profile/webp/bookmark.webp"
            pngSrc="/profile/png/bookmark.png"
            alt="북마크"
            className="w-full h-full object-cover"
          />
        </div>

        <span className="text-clamp30 font-normal">저장보기</span>
      </button>
    </div>
  );
};

export default Bottom;
