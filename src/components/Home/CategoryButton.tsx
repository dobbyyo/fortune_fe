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
      className="flex flex-col items-center justify-center w-[110px] h-[110px] bg-[#DECEFF] font-normal rounded-lg shadow-md hover:bg-purple-200 transition cursor-pointer"
    >
      <ResponsiveImage webpSrc={webpIcon} pngSrc={pngIcon} alt="search" className="w-[45px] h-[45px]" />
      <span className="mt-1 text-[15px] sm:text-[25px] text-black font-normal">{label}</span>
    </div>
  );
};

export default CategoryButton;
