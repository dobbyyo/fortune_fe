import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from '@/pages/Home/Home';
import MyPage from '@/pages/Mypage/mypage';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route
				path="/"
				element={
					<PublicRoute>
						<Home />
					</PublicRoute>
				}
			/>

			<Route
				path="/myPage"
				element={
					<PrivateRoute>
						<MyPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	</BrowserRouter>
);

export default Router;
