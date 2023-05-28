import React, {
   FC,
   useCallback,
   useEffect,
   useMemo,
   useRef,
   useState
} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Button from 'antd/es/button';
import { default as FilterOutlined } from '@ant-design/icons/lib/icons/FilterOutlined';
import { IDoctor, IReport } from 'shared/index';
import ExportButton from 'entities/exportButton';
import DoctorsDashboard from 'widgets/dashboard/doctors';
import DoctorDashboard from 'widgets/dashboard/doctor';
import DepartmentDashboard from 'widgets/dashboard/department';
import LayoutPage from 'widgets/layout';
import ReportBreadcrumb, {
   findDoctorById,
   REPORT_TABS
} from 'entities/reportBreadcrumb';
import jsPDF from 'jspdf';
import { renderToStaticMarkup } from 'react-dom/server';
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
      const position = searchParams.get('position');
      const doctor = Number(searchParams.get('doctor'));
      switch (tab) {
         case REPORT_TABS.DOCTORS:
            res = (
               <DoctorsDashboard
                  report={report}
                  tab={tab}
                  position={position}
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

   const exportReportToPdf = useCallback((currentPage?: boolean) => {
      const doc = new jsPDF({
         format: 'a4',
         unit: 'px'
      });

      doc.setFont('Inter-Regular', 'normal');
      doc.html(renderToStaticMarkup(<FilterOutlined />), {
         async callback(doc) {
            await doc.save('document');
         }
      });
   }, []);

   const pageRef = useRef();

   return (
      <LayoutPage
         currentPage={MENU_SELECTED}
         loading={loading}
         title={report.name}
         titleLoading={loading}
         backButtonPath={'/'}
         rightTemplate={<ExportButton exportPdf={exportReportToPdf} />}
      >
         <div>
            <div className={'tw-pb-3 tw-flex tw-justify-between'}>
               <ReportBreadcrumb report={report} />
               {filterVisibility && (
                  <Button type="text" ref={pageRef}>
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
