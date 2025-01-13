import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

const Header = () => {
  return (
    <header
      className="navbar fixed top-0 left-0 w-full h-[80px] sm:h-[100px] 
    bg-white flex items-center px-4 shadow-md z-50 md:px-8"
    >
      <LeftHeader />
      <RightHeader />
    </header>
  );
};

export default Header;
