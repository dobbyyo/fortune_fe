import { useNavigate } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

const BackNavBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  // 뒤로가기 버튼 클릭 시
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="navbar w-full flex items-center h-[40px] sm:h-[100px] relative">
      <div className="absolute left-0 w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] cursor-pointer">
        <ResponsiveImage
          webpSrc="/terms/webp/arrow_left.webp"
          pngSrc="/terms/png/arrow_left.png"
          alt="back-icon"
          handleClick={handleBackClick}
        />
      </div>
      <h1 className="pl-2 mx-auto text-[20px] sm:text-[25px] font-bold">{title}</h1>
    </div>
  );
};

export default BackNavBar;
