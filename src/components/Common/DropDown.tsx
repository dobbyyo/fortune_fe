import { useNavigate } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

const DropDown = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      label: '타로',
      pngIcon: '/side_icon/png/tarot.png',
      webpIcon: '/side_icon/webp/tarot.webp',
      path: '/tarot',
    },
    {
      label: '사주',
      pngIcon: '/side_icon/png/saju.png',
      webpIcon: '/side_icon/webp/saju.webp',
      path: '/saju',
    },
    {
      label: '꿈해몽',
      pngIcon: '/side_icon/png/dreaming.png',
      webpIcon: '/side_icon/webp/dreaming.webp',
      path: '/dream',
    },
    {
      label: '작명',
      pngIcon: '/side_icon/png/naming.png',
      webpIcon: '/side_icon/webp/naming.webp',
      path: '/naming',
    },
  ];

  const onClickPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-[45px] h-[45px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[30px] w-[30px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content border-2 rounded-box z-[9] mt-3 w-[300px] sm:w-[319px] 
              p-2 shadow bg-white flex flex-wrap justify-between"
      >
        {menuItems.map((item, index) => (
          <button key={index} className="flex items-center w-full " onClick={() => onClickPage(item.path)}>
            <div className="flex w-full justify-start items-center border-b-2  space-x-4 py-4">
              <div className="w-[45px] h-[45px]">
                <ResponsiveImage
                  webpSrc={item.webpIcon}
                  pngSrc={item.pngIcon}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[12px] sm:text-[20px] font-normal ml-2">{item.label}</div>
            </div>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
