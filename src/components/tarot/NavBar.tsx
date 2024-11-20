import { authState } from '@/stores/useAuthStore';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const NavBar = () => {
	const isAuthenticated = useRecoilValue(authState);

	return (
		<div className="navbar w-full">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-[45px] h-[45px]">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-[45px] w-[45px]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
						<li>
							<Link to={'/'}>{isAuthenticated ? '이름' : '로그인'}</Link>
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
			<div className="navbar-center">
				<h2 className="text-[50px] font-bold">타로</h2>
			</div>
		</div>
	);
};

export default NavBar;
