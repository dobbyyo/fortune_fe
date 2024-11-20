const Header = () => {
	return (
		<header className="fixed top-0 left-0 w-full h-[186px] bg-white flex items-center px-4 shadow-md z-50">
			<div className="avatar">
				<div className="w-[111px] h-[111px] rounded-xl bg-[#DECEFF]">
					<img src="/header-icon.jpg" alt="Avatar" />
				</div>
			</div>
			<div className="ml-5 text-[70px] font-bold">너의 이름은</div>
		</header>
	);
};

export default Header;
