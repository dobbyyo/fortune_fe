import { Link } from 'react-router-dom';
import { ResponsiveImage } from '../Common';

const LeftHeader = () => {
  return (
    <div className="flex-1 flex items-center">
      <div className="avatar">
        <div
          className="relative w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] 
                     md:w-[100px] md:h-[100px] rounded-xl bg-[#DECEFF]"
        >
          <ResponsiveImage webpSrc="/header/webp/login-logo.webp" pngSrc="/header/png/login-logo.png" alt="Avatar" />
        </div>
      </div>
      <Link to={'/'} className="flex ml-3 font-bold cursor-pointer sm:text-[30px]">
        너의 이름은
      </Link>
    </div>
  );
};

export default LeftHeader;
