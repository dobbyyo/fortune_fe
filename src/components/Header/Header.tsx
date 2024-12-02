import { useMyDataQuery } from '@/services/queries/user.query';
import { authState, userState } from '@/stores/useAuthStore';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const Header = () => {
  const [userDatas, setUserDatas] = useRecoilState(userState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, []);

  const goMyPage = useCallback(() => {
    navigate('/myPage');
  }, []);

  const goLogin = useCallback(() => {
    navigate('/login');
  }, []);

  const { data } = useMyDataQuery();
  const myInfo = data?.myInfo;

  useEffect(() => {
    if (myInfo) {
      setUserDatas(myInfo);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [myInfo]);

  return (
    <header className="navbar absolute top-0 left-0 w-full h-[80px] sm:h-[120px] md:h-[150px] bg-white flex items-center px-4 shadow-md z-50 md:px-8">
      <div className="flex-1 flex items-center">
        <div className="avatar">
          <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[111px] md:h-[111px] rounded-xl bg-[#DECEFF]">
            <img src="/header-icon.jpg" alt="Avatar" onClick={goHome} className="cursor-pointer" />
          </div>
        </div>
        {/* <div className="ml-3 text-clamp50 font-bold cursor-pointer" onClick={goHome}>
					너의 이름은
				</div> */}
      </div>

      <div className="flex-none gap-2 ">
        {isAuthenticated && userDatas ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar w-[36px] h-[36px] sm:w-[46px] sm:h-[46px] md:w-[56px] md:h-[56px]"
              >
                <div className="rounded-full w-[35px] h-[35px] sm:w-[46px] sm:h-[46px]">
                  <img
                    alt="사용자 프로필 이미지"
                    src={userDatas.profile.profile_url as string}
                    className="w-full h-full cursor-pointer"
                    onClick={goMyPage}
                  />
                </div>
              </div>
            </div>
            {/* <div className="form-control">
							<h3 onClick={goMyPage} className="text-[20px] sm:text-[25px] md:text-[30px] font-normal cursor-pointer">
								{userDatas.username}
							</h3>
						</div> */}
            <button className="btn btn-primary text-white w-[120px] h-[50px] sm:w-[140px] sm:h-[60px] md:w-[160px] md:h-[68px] ml-[20px] sm:ml-[30px] md:ml-[40px] bg-[#A57AF1] text-[20px] sm:text-[25px] md:text-[30px] font-bold text-black border-none">
              로그아웃
            </button>
          </>
        ) : (
          <button
            onClick={goLogin}
            className="btn btn-primary w-[120px] h-[50px] sm:w-[140px] sm:h-[60px] md:w-[160px] md:h-[68px] ml-[20px] sm:ml-[30px] md:ml-[40px] bg-[#A57AF1] text-[20px] sm:text-[25px] md:text-[30px] font-bold text-white border-none"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
