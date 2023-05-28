import React, { useEffect, useRef } from 'react';
import { IReport, pageToPdf } from 'shared/index';
import { useLocation } from 'react-router-dom';
import DepartmentDashboard from 'widgets/dashboard/department';
import { default as Title } from 'antd/es/typography/Title';
import DoctorsDashboard from 'widgets/dashboard/doctors';
import DoctorDashboard from 'widgets/dashboard/doctor';

const ReportToPdf = () => {
   const location = useLocation();
   const report: IReport = location.state.report;
   const reportId = String(report.reportId);
   const pageRef = useRef();
   useEffect(() => {
      setTimeout(() => {
         pageToPdf(pageRef.current, report.name);
      }, 1500);
   });
   return (
      <div ref={pageRef} className={'tw-p-5'}>
         <Title level={2}>Отчет по должностям</Title>
         <DepartmentDashboard report={report} reportId={reportId} />
         {Object.keys(report.positions).map((item) => (
            <div>
               <Title className={'tw-pt-10'} level={2}>
                  Отчет по должности - {report.positions[item]}
               </Title>
               <DoctorsDashboard
                  report={report}
                  reportId={reportId}
                  position={item}
               />
               {report.doctors.map((doctor) => (
                  <div>
                     <Title className={'tw-pt-10'} level={2}>
                        Отчет по доктору - {doctor.name}
                     </Title>
                     <DoctorDashboard id={doctor.id} doctor={doctor} />
                  </div>
               ))}
            </div>
         ))}
      </div>
   );
};

export default ReportToPdf;
