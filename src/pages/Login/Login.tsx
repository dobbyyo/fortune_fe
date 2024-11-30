const Login = () => {
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<div>
				<img
					src="/login-icon.jpg"
					alt="logo"
					className="w-[200px] h-[220px] sm:w-[300px] sm:h-[330px] md:w-[366px] md:h-[403px] mx-auto mt-10"
				/>
			</div>
			<button
				className="btn btn-warning bg-[#FFD34B] border-none w-[280px] h-[50px] text-[18px] 
				sm:w-[400px] sm:h-[60px] sm:text-[22px] 
				md:w-[800px] md:h-[68px] md:text-[30px] 
				rounded-[30px] font-bold mt-6"
				onClick={handleLogin}
			>
				카카오톡으로 로그인
			</button>
		</div>
	);
};

export default Login;
