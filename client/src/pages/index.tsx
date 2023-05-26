import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReportsPage from './reports';
import ReportPage from './report';
import ReferralPage from './referral';

const router = createBrowserRouter([
   {
      path: '/',
      element: <ReportsPage />
   },
   {
      path: '/report/:reportId',
      element: <ReportPage />
   },
   {
      path: '/referral',
      element: <ReferralPage />
   }
]);

const Routing = () => {
   return (
      <>
         <RouterProvider router={router} />
      </>
   );
};

export default Routing;
