import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PrivateRoute, PublicRoute, routes } from './index';
import { LoadingBar } from '@/components/Common';

const Router = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <div>
          <LoadingBar />
        </div>
      }
    >
      <Routes>
        {routes.map(({ path, element, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : <PublicRoute>{element}</PublicRoute>}
          />
        ))}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
