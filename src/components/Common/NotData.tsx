const NotData = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col w-full justify-center items-center pt-20">
        <img src="/notService/notService.jpg" alt="Not Current Service" className="w-[100px] h-[100px]" />
        <h3 className="text-center w-full text-[30px] font-bold pt-10">데이터가 없습니다.</h3>
      </div>
    </div>
  );
};

export default NotData;