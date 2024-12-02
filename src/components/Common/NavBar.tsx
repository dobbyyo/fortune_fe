import { getLocalStorage } from '@/lib/localStorage';
import { useTarotCardBookmarkDeleteMutation, useTarotCardBookmarkMutation } from '@/services/queries/tarot.query';
import { authState } from '@/stores/useAuthStore';
import { tarotCardsState } from '@/stores/useTarotCardStore';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const NavBar = ({ title, isResult }: { title: string; isResult: boolean }) => {
  const isAuthenticated = useRecoilValue(authState);
  const tarotCards = useRecoilValue(tarotCardsState);
  const isTarotBookmark = getLocalStorage('tarotBookmark');

  const { mutate: bookMarkMutate } = useTarotCardBookmarkMutation();
  const { mutate: deleteBookmarkMutate } = useTarotCardBookmarkDeleteMutation();

  const onBookmark = () => {
    if (isAuthenticated.isAuthenticated) {
      if (isTarotBookmark && isTarotBookmark.isBookmark) {
        return deleteBookmarkMutate(isTarotBookmark.id);
      }

      bookMarkMutate({
        payload: {
          mainTitle: '오늘의 타로',
          cards: tarotCards.map((card) => ({
            cardId: card.id,
            subTitle: card.subTitle,
            isReversed: card.isReversed,
            cardInterpretation: card.interpretation.interpretation,
          })),
        },
      });
    } else {
      alert('로그인이 필요한 서비스입니다.');
    }
  };

  return (
    <div className="navbar w-full flex items-center px-4 relative">
      <div className="navbar-start absolute left-0">
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
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to={'/'}>{isAuthenticated.isAuthenticated ? '이름' : '로그인'}</Link>
            </li>
            <li>
              <Link to={'/'}>타로</Link>
            </li>
            <li>
              <Link to={'/'}>사주</Link>
            </li>
            <li>
              <Link to={'/'}>꿈해몽</Link>
            </li>
            <li>
              <Link to={'/'}>작명</Link>
            </li>
          </ul>
        </div>
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
            {isTarotBookmark ? (
              <img src="/on-bookmark-icon.jpg" alt="Bookmark" className="w-full h-full object-cover" />
            ) : (
              <img src="/off-bookmark-icon.jpg" alt="Bookmark" className="w-full h-full object-cover" />
            )}
          </button>
          <button className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] flex items-center justify-center">
            <img src="/share-icon.jpg" alt="Share" className="w-full h-full object-cover" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
