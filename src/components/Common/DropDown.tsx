import { useNavigate } from 'react-router-dom';

const DropDown = () => {
  const navigate = useNavigate();
  const menuItems = [
    { label: '타로', icon: '/mainTarot.svg', path: '/tarot' },
    { label: '사주', icon: '/mainSaju.svg', path: '/saju' },
    { label: '꿈해몽', icon: '/mainDream.svg', path: '/dream' },
    { label: '작명', icon: '/mainNaming.svg', path: '/naming' },
  ];

  const onClickPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-[45px] h-[45px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[30px] w-[30px] sm:h-[45px] sm:w-[45px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content border-2 rounded-box z-[9] mt-3 w-[319px] 
              p-2 shadow bg-white flex flex-wrap justify-between"
      >
        {menuItems.map((item, index) => (
          <button key={index} className="flex items-center w-full " onClick={() => onClickPage(item.path)}>
            <div className="flex w-full justify-start items-center border-b-2  space-x-4 py-4">
              <img src={item.icon} alt={item.label} className="w-[45px] h-[45px]" />
              <div className="text-clamp30 font-normal ml-2">{item.label}</div>
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
