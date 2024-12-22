import { useNavigate } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

const BackNavBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  // 뒤로가기 버튼 클릭 시
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full flex items-center">
      <div className="absolute left-0 w-[50px] h-[50px] cursor-pointer">
        <ResponsiveImage
          webpSrc="/terms/webp/arrow_left.webp"
          pngSrc="/terms/png/arrow_left.png"
          alt="back-icon"
          handleClick={handleBackClick}
        />
      </div>
      <h1 className="pl-2 mx-auto font-bold text-[25px]">{title}</h1>
    </div>
  );
};

export default BackNavBar;
