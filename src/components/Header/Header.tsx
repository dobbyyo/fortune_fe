import { authState, userState } from '@/stores/useAuthStore';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const Header = () => {
	const isAuthenticated = useRecoilValue(authState);
	const userData = useRecoilValue(userState);
	const navigate = useNavigate();

	const goHome = useCallback(() => {
		navigate('/');
	}, []);

	const goMypage = useCallback(() => {
		navigate('/mypage');
	}, []);

	return (
		<header className="navbar absolute top-0 left-0 w-full h-[186px] bg-white flex items-center px-4 shadow-md z-50 md:px-8">
			<div className="flex-1 flex items-center">
				<div className="avatar">
					<div className="w-[80px] h-[80px] md:w-[111px] md:h-[111px] rounded-xl bg-[#DECEFF]">
						<img src="/header-icon.jpg" alt="Avatar" onClick={goHome} className="cursor-pointer" />
					</div>
				</div>
				<div className="ml-3 md:ml-5 text-[50px] max-sm:hidden font-bold cursor-pointer" onClick={goHome}>
					너의 이름은
				</div>
			</div>

			<div className="flex-none gap-2 max-sm:hidden">
				{isAuthenticated ? (
					<>
						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar w-[46px] h-[46px]">
								<div className="rounded-full w-[46px] h-[46px]">
									<img
										alt="사용자 프로필 이미지"
										src={userData.profile.profile_url}
										className="w-[46px] h-[45px] cursor-pointer"
										onClick={goMypage}
									/>
								</div>
							</div>
						</div>
						<div className="form-control">
							<h3 onClick={goMypage} className="text-[30px] font-normal cursor-pointer">
								{userData.username}
							</h3>
						</div>
						<button className="btn btn-primary w-[160px] h-[68px] ml-[40px] bg-[#A57AF1] text-[30px] font-bold text-black border-none">
							로그아웃
						</button>
					</>
				) : (
					<button className="btn btn-primary w-[160px] h-[68px] ml-[40px] bg-[#A57AF1] text-[30px] font-bold text-white border-none">
						로그인
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
