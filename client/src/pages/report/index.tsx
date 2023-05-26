import React, { FC, useEffect, useState } from 'react';
import Dashboard from 'widgets/dashboard';
import LayoutPage from 'widgets/layout';
import { getReport } from './api';
import { useParams } from 'react-router-dom';
import { IReport } from 'shared/index';

const MENU_SELECTED: string[] = [];

const ReportPage: FC = () => {
   const params = useParams();
   const [loading, setLoading] = useState(true);
   const [report, setReport] = useState({} as IReport);
   useEffect(() => {
      getReport(params.reportId).then((report) => {
         setReport(report);
         setLoading(false);
      });
   }, []);
   return (
      <LayoutPage
         currentPage={MENU_SELECTED}
         loading={loading}
         title={report.name}
         titleLoading={loading}
         backButtonPath={'/'}
      >
         <Dashboard report={report} />
      </LayoutPage>
   );
};

export default ReportPage;
