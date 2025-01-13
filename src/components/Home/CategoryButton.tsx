import { useNavigate } from 'react-router-dom';
import { ResponsiveImage } from '../Common';

const CategoryButton = ({
  webpIcon,
  pngIcon,
  label,
  pageUrl,
}: {
  webpIcon: string;
  pngIcon: string;
  label: string;
  pageUrl: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${pageUrl}`)}
      className="flex flex-col items-center justify-center w-[60px] h-[60px] sm:w-[110px] sm:h-[110px]
       bg-[#DECEFF] font-normal rounded-lg shadow-md hover:bg-purple-200 transition cursor-pointer"
    >
      <ResponsiveImage
        webpSrc={webpIcon}
        pngSrc={pngIcon}
        alt="search"
        className="w-[20px] h-[20px] sm:w-[45px] sm:h-[45px]"
      />
      <span className="mt-1 text-[16px] sm:text-[18px] text-black font-normal">{label}</span>
    </div>
  );
};

export default CategoryButton;
