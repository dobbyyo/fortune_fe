const Login = () => {
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	return (
		<div>
			<div>
				<img src="/login-icon.jpg" alt="logo" className="w-[366px] h-[403px] mx-auto mt-10" />
			</div>
			<button
				className="btn btn-warning bg-[#FFD34B] border-none w-[800px] 
      h-[68px] rounded-[30px] text-[30px] font-bold"
				onClick={handleLogin}
			>
				카카오톡으로 로그인
			</button>
		</div>
	);
};

export default Login;
