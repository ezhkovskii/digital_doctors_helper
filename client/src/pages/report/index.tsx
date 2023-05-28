import React, {
   FC,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState
} from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from 'antd/es/button';
import { default as FilterOutlined } from '@ant-design/icons/lib/icons/FilterOutlined';
import { IDoctor, IReport, pageToPdf } from 'shared/index';
import ExportButton from 'entities/exportButton';
import DoctorsDashboard from 'widgets/dashboard/doctors';
import DoctorDashboard from 'widgets/dashboard/doctor';
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
   const navigate = useNavigate();
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
      let res = (
         <DepartmentDashboard report={report} reportId={params.reportId} />
      );
      const tab = searchParams.get('tab');
      const position = searchParams.get('position');
      const doctor = Number(searchParams.get('doctor'));
      switch (tab) {
         case REPORT_TABS.DOCTORS:
            res = (
               <DoctorsDashboard
                  report={report}
                  tab={tab}
                  position={position}
                  reportId={params.reportId}
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
         default:
            setFilterVisibility(false);
            break;
      }
      return res;
   }, [report, searchParams]);

   const exportReportToPdf = useCallback(
      async (data: { currentPage: boolean; report: IReport }) => {
         if (data.currentPage) {
            pageToPdf(pageRef.current, data.report.name);
         } else {
            navigate('/reportToPdf', {
               state: {
                  report: data.report
               }
            });
         }
      },
      [report]
   );

   const pageRef = useRef();

   return (
      <LayoutPage
         currentPage={MENU_SELECTED}
         loading={loading}
         title={report.name || ''}
         titleLoading={loading}
         backButtonPath={'/'}
         rightTemplate={
            report.reportId ? (
               <ExportButton report={report} exportPdf={exportReportToPdf} />
            ) : (
               <div></div>
            )
         }
      >
         {report.reportId ? (
            <div ref={pageRef}>
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
         ) : (
            <div>Отчет не найден</div>
         )}
      </LayoutPage>
   );
};

export default ReportPage;
