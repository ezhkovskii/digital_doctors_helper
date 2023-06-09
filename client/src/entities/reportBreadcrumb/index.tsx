import React, { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IDoctor, IReport } from 'shared/index';
import Breadcrumb from 'antd/es/breadcrumb';

export const REPORT_TABS = {
   DOCTORS: 'doctors',
   DOCTOR: 'doctor',
   PATIENT: 'patient'
};

interface IReportBreadcrumbOptions {
   report: IReport;
}

export const findDoctorById = (
   doctors: IDoctor[],
   doctorId: number
): IDoctor | null => {
   let res: IDoctor | null = null;
   for (let index = 0; index < doctors.length; index++) {
      const doctor = doctors[index];
      if (doctorId === doctor.id) {
         res = doctor;
         break;
      }
   }
   return res;
};

const ReportBreadcrumb = (props: IReportBreadcrumbOptions) => {
   const [searchParams] = useSearchParams();
   const navigation = useNavigate();
   const params = useParams();

   const items = useMemo(() => {
      const data = [
         {
            title: <a>Отчет по подразделениям</a>,
            onClick: () => {
               navigation(`/report/${params.reportId}`);
            }
         }
      ];
      const tab = searchParams.get('tab');
      const position = searchParams.get('position');

      if (
         tab === REPORT_TABS.DOCTORS ||
         tab === REPORT_TABS.DOCTOR ||
         tab === REPORT_TABS.PATIENT
      ) {
         data.push({
            title: (
               <a>
                  Отчет по врачам{' '}
                  {position ? ` - ${props.report?.positions?.[position]}` : ''}
               </a>
            ),
            onClick: () => {
               navigation({
                  pathname: `/report/${params.reportId}`,
                  search: `tab=doctors&position=${position}`
               });
            }
         });
      }

      if (tab === REPORT_TABS.DOCTOR || tab === REPORT_TABS.PATIENT) {
         const doctorId = Number(searchParams.get('doctor'));
         let doctorName = '';
         if (props.report) {
            const doctor = findDoctorById(
               props.report?.doctors || [],
               doctorId
            );
            if (doctor) {
               doctorName = doctor.name;
            }
         }
         data.push({
            title: <a>Врач - {doctorName}</a>,
            onClick: () => {}
         });
      }
      return data;
   }, [searchParams, props.report]);

   return (
      <Breadcrumb className={'tw-self-center'} separator="/" items={items} />
   );
};

export default ReportBreadcrumb;
