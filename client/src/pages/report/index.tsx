import React, { FC, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from 'antd/es/button';
import { default as FilterOutlined } from '@ant-design/icons/lib/icons/FilterOutlined';
import { IDoctor, IReport } from 'shared/index';
import ExportButton from 'entities/exportButton';
import DoctorsDashboard from 'widgets/dashboard/doctors';
import DoctorDashboard from 'widgets/dashboard/doctor';
import PatientDashboard from 'widgets/dashboard/patient';
import DepartmentDashboard from 'widgets/dashboard/department';
import LayoutPage from 'widgets/layout';
import ReportBreadcrumb, {
   findDoctorById,
   REPORT_TABS
} from 'entities/reportBreadcrumb';
import { getReport } from './api';

const MENU_SELECTED: string[] = [];

const ReportPage: FC = () => {
   const params = useParams();
   const [searchParams] = useSearchParams();
   const [loading, setLoading] = useState(true);
   const [report, setReport] = useState({} as IReport);
   const [filterVisibility, setFilterVisibility] = useState(false);

   useEffect(() => {
      getReport(params.reportId).then((report) => {
         setReport(report);
         setLoading(false);
      });
   }, []);

   const currentTab = useMemo(() => {
      let res = <DepartmentDashboard report={report} />;
      const tab = searchParams.get('tab');
      const direction = searchParams.get('direction') as 'cardio';
      const doctor = Number(searchParams.get('doctor'));
      switch (tab) {
         case REPORT_TABS.DOCTORS:
            res = (
               <DoctorsDashboard
                  report={report}
                  tab={tab}
                  direction={direction}
               />
            );
            break;
         case REPORT_TABS.DOCTOR:
            let doctorRecord: IDoctor = {} as IDoctor;
            if (report?.doctors) {
               doctorRecord = findDoctorById(report.doctors, doctor);
            }
            res = <DoctorDashboard id={doctor} doctor={doctorRecord} />;
            break;
         case REPORT_TABS.PATIENT:
            res = (
               <PatientDashboard
                  report={report}
                  tab={tab}
                  direction={direction}
               />
            );
            break;
         default:
            setFilterVisibility(false);
            break;
      }
      return res;
   }, [report, searchParams]);

   return (
      <LayoutPage
         currentPage={MENU_SELECTED}
         loading={loading}
         title={report.name}
         titleLoading={loading}
         backButtonPath={'/'}
         rightTemplate={<ExportButton />}
      >
         <div>
            <div className={'tw-pb-3 tw-flex tw-justify-between'}>
               <ReportBreadcrumb report={report} />
               {filterVisibility && (
                  <Button type="text">
                     <FilterOutlined />
                  </Button>
               )}
            </div>
            {currentTab}
         </div>
      </LayoutPage>
   );
};

export default ReportPage;
