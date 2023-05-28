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
      const direction = props.direction;
      const res: IDoctor[] = [];
      if (props.report?.doctors) {
         const doctors = props.report.doctors;
         doctors.forEach((item) => {
            if (item.direction === direction) {
               res.push(item);
            }
         });
      }
      return res;
   }, [props.report, props.direction]);

   const pieDirectionData = useMemo(() => {
      const direction = props.direction;
      return props.report?.reportsTypeCount?.[direction] || [];
   }, [props.report, props.direction]);

   const pieSexData = useMemo(() => {
      const direction = props.direction;
      const sex = props.report?.patientsCount?.[direction];
      let data: { name: string; count: number }[] = [];
      if (sex) {
         data = [
            {
               name: 'Мужчины',
               count: sex.male
            },
            {
               name: 'Женщины',
               count: sex.female
            }
         ];
      }
      return data;
   }, [props.report, props.direction]);

   const openReport = useCallback(
      (doctorId: number) => {
         const direction = props.direction;
         navigate({
            pathname: `/report/${params.reportId}`,
            search: `tab=doctor&direction=${direction}&doctor=${doctorId}`
         });
      },
      [props.direction]
   );

   const columns: ColumnsType<IDoctor> = useMemo(
      () => [
         {
            title: 'ФИО',
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
            seriesField={''}
            xAxis={{
               label: {
                  autoHide: true,
                  autoRotate: false
               }
            }}
         />
         <div className={'tw-flex tw-pt-5'}>
            <Pie
               className={'tw-w-1/2'}
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
            <Divider style={{ height: '300px' }} type="vertical" />
            <Pie
               className={'tw-w-1/2'}
               data={pieSexData}
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
