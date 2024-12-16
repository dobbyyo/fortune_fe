import DropDown from './DropDown';

const NavBar = ({
  title,
  isResult,
  onBookmark,
  isBookmark,
  onShare,
}: {
  title: string;
  isResult: boolean;
  onBookmark?: () => void;
  isBookmark: boolean;
  onShare?: () => void;
}) => {
  return (
    <div className="navbar w-full flex items-center px-4 relative">
      <div className="navbar-start absolute left-0">
        <DropDown />
      </div>
      <div className="navbar-center absolute left-1/2 transform -translate-x-1/2">
        <h2 className="text-clamp50 font-bold text-center">{title}</h2>
      </div>

      {isResult && (
        <div className="navbar-end absolute right-0 flex items-center space-x-4">
          <button
            onClick={onBookmark}
            className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] flex items-center justify-center"
          >
            {isBookmark ? (
              <img src="/on-bookmark-icon.jpg" alt="Bookmark" className="w-full h-full object-cover" />
            ) : (
              <img src="/off-bookmark-icon.jpg" alt="Bookmark" className="w-full h-full object-cover" />
            )}
          </button>
          {onShare && (
            <button
              onClick={onShare}
              className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] flex items-center justify-center"
            >
              <img src="/share-icon.jpg" alt="Share" className="w-full h-full object-cover" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
