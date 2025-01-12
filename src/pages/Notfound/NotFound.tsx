import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-4">
      <h1 className="text-7xl font-bold text-gray-800 sm:text-5xl">404</h1>
      <p className="text-lg text-gray-600 mt-4 sm:text-base">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition sm:px-4 sm:py-2 sm:text-sm"
      >
        홈으로 이동
      </Link>
    </div>
  );
};

export default NotFound;
