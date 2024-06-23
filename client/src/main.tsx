import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/scrollbar.css';
import './index.css';
import { Navigate, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage.tsx';
import RegisterPage from './pages/auth/RegisterPage.tsx';
import PackagesPage from './pages/packages/ui/pages/PackagesPage.tsx';
import RegisterPackagePage from './pages/packages/ui/pages/RegisterPackagePage.tsx';
import UpdatePackagePage from './pages/packages/ui/pages/UpdatePackagePage.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registro',
    element: <RegisterPage />,
  },
  {
    path: '/encomendas',
    element: <PackagesPage />,
  },
  {
    path: '/encomendas/registrar',
    element: <RegisterPackagePage />,
  },
  {
    path: '/encomendas/editar/:id',
    element: <UpdatePackagePage />,
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
