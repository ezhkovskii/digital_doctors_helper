import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReportsPage from './reports';
import ReportPage from './report';
import ReferralPage from './referral';
import LoginPage from './login';
import { checkAuth } from 'shared/index';
import DiagnosisPage from './diagnosis';
import ReportToPdf from './reportToPdf';

const router = createBrowserRouter([
   {
      path: '/',
      element: <ReportsPage />,
      loader: checkAuth
   },
   {
      path: '/login',
      element: <LoginPage />
   },
   {
      path: '/report/:reportId',
      element: <ReportPage />,
      loader: checkAuth
   },
   {
      path: '/referral',
      element: <ReferralPage />,
      loader: checkAuth
   },
   {
      path: '/diagnosis',
      element: <DiagnosisPage />,
      loader: checkAuth
   },
   {
      path: '/reportToPdf',
      element: <ReportToPdf />,
      loader: checkAuth
   }
]);

const Routing = () => {
   return <RouterProvider router={router} />;
};

export default Routing;
