import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Column from '@ant-design/plots/es/components/column';
import Pie from '@ant-design/plots/es/components/pie';
import Table, { ColumnsType } from 'antd/es/table';
import Progress from 'antd/es/progress';
import Divider from 'antd/es/divider';
import Space from 'antd/es/space';
import { IDoctor } from 'shared/index';
import { IDashboardOptions } from '../lib/interfaces';

const DoctorsDashboard = (props: IDashboardOptions) => {
   const navigate = useNavigate();
   const params = useParams();
   const data = useMemo(() => {
      const position = props.position;
      const res: IDoctor[] = [];
      if (props.report?.doctors) {
         const doctors = props.report.doctors;
         doctors.forEach((item) => {
            if (item.position === position) {
               res.push(item);
            }
         });
      }
      return res;
   }, [props.report, props.position]);

   const pieDirectionData = useMemo(() => {
      const position = props.position;
      return props.report?.reportsTypeCount?.[position] || [];
   }, [props.report, props.position]);

   const openReport = useCallback(
      (doctorId: number) => {
         const position = props.position;
         navigate({
            pathname: `/report/${params.reportId}`,
            search: `tab=doctor&position=${position}&doctor=${doctorId}`
         });
      },
      [props.position]
   );

   const columns: ColumnsType<IDoctor> = useMemo(
      () => [
         {
            title: 'ФИО врача',
            dataIndex: 'name',
            key: 'name'
         },
         {
            title: 'Кол-во пациентов',
            width: '10%',
            render: (_, record) => <div>{record.patients.length}</div>
         },
         {
            title: 'Процент корректности',
            dataIndex: 'value',
            key: 'value',
            width: '20%',
            render: (_, record) => <Progress percent={record.percent} />
         },
         {
            title: 'Действия',
            key: 'action',
            width: '20%',
            render: (_, record) => (
               <Space size="middle">
                  <a onClick={openReport.bind(this, record.id)}>
                     Открыть отчет по врачу
                  </a>
               </Space>
            )
         }
      ],
      [props.report]
   );

   return (
      <div>
         <Column
            height={350}
            data={data}
            xField={'name'}
            yField={'percent'}
            seriesField={'name'}
            xAxis={{
               label: {
                  autoHide: true,
                  autoRotate: false
               }
            }}
         />
         <div className={'tw-flex tw-pt-5'}>
            <Pie
               className={'tw-w-full'}
               data={pieDirectionData}
               height={300}
               angleField={'count'}
               colorField={'name'}
               radius={0.9}
               innerRadius={0.6}
               statistic={{
                  title: {
                     customHtml: () => `<div>Всего</div>`
                  }
               }}
            />
         </div>
         <Table
            className={'tw-pt-5'}
            rootClassName={'tw-flex tw-flex-col tw-grow'}
            columns={columns}
            dataSource={data}
            pagination={false}
         />
      </div>
   );
};

export default DoctorsDashboard;
