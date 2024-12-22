import { useNavigate } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

const NotService = () => {
  const navigate = useNavigate();

  const goBackPage = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col w-full justify-center items-center pt-20">
        <div className="w-[100px] h-[100px]">
          <ResponsiveImage
            webpSrc="/naming/webp/not.webp"
            pngSrc="/naming/png/not.png"
            alt="Not Current Service"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-center w-full text-[20px] sm:text-[30px] font-bold pt-10">서비스 준비 중</h3>

        <button
          onClick={goBackPage}
          type="button"
          className="w-[200px] py-2 btn btn-warning text-[20px] sm:text-[30px] mt-10"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default NotService;
