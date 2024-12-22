import { ResponsiveImage } from '../Common';

const LoginIcon = () => {
  return (
    <div className="w-[200px] h-[220px] sm:w-[300px] sm:h-[330px] md:w-[366px] md:h-[403px] mx-auto mt-10">
      <ResponsiveImage
        webpSrc="/login/png/login-logo.png"
        pngSrc="/login/webp/login-logo.webp"
        alt="logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LoginIcon;
