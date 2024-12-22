import ResponsiveImage from './ResponsiveImage';

const NotData = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col w-full justify-center items-center pt-20">
        <div className="w-[100px] h-[100px]">
          <ResponsiveImage
            webpSrc="/naming/webp/not.webp"
            pngSrc="/naming/png/not.png"
            alt="Not Current Service"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-center w-full text-[30px] font-bold pt-10">데이터가 없습니다.</h3>
      </div>
    </div>
  );
};

export default NotData;
