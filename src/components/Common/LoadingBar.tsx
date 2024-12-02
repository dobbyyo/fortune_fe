const LoadingBar = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50 h-full">
      <span className="loading loading-spinner text-secondary w-[100px] h-[100px]" />
    </div>
  );
};

export default LoadingBar;
