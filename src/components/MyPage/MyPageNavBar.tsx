import { DropDown } from '../Common';

const MyPageNavBar = () => {
  return (
    <div className="navbar w-full flex items-center px-4 relative">
      <div className="navbar-start absolute left-0">
        <DropDown />
      </div>
      <div className="navbar-center absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-clamp50  font-bold">프로필</h1>
      </div>
      <div className="navbar-end absolute right-0 flex items-center space-x-4">
        <button className="w-[30px] h-[35px] sm:w-[45px] sm:h-[50px]">
          <img src="/common/cogwheel-icon.jpg" alt="설정" className="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  );
};

export default MyPageNavBar;
