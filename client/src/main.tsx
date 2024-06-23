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
import DeliverymanPage from './pages/deliveryman/ui/pages/DeliverymanPage.tsx';
import RegisterDeliverymanPage from './pages/deliveryman/ui/pages/RegisterDeliverymanPage.tsx';
import UpdateDeliverymanPage from './pages/deliveryman/ui/pages/UpdateDeliverymanPage.tsx';
import ReceiverPage from './pages/receiver/ui/pages/ReceiverPage.tsx';
import RegisterReceiverPage from './pages/receiver/ui/pages/RegisterReceiverPage.tsx';
import UpdateReceiverPage from './pages/receiver/ui/pages/UpdateReceiverPage.tsx';

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
    path: 'encomendas/registrar',
    element: <RegisterPackagePage />,
  },
  {
    path: 'encomendas/editar/:id',
    element: <UpdatePackagePage />,
  },
  {
    path: '/entregadores',
    element: <DeliverymanPage />,
  },
  {
    path: '/entregadores/registrar',
    element: <RegisterDeliverymanPage />,
  },
  {
    path: '/entregadores/editar/:id',
    element: <UpdateDeliverymanPage />,
  },
  {
    path: '/destinatarios',
    element: <ReceiverPage />,
  },
  {
    path: '/destinatarios/registrar',
    element: <RegisterReceiverPage />,
  },
  {
    path: '/destinatarios/editar/:id',
    element: <UpdateReceiverPage />,
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
