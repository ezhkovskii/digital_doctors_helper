import React, { useMemo } from 'react';
import { Gauge } from '@ant-design/plots';
import { IDoctor, IPatient } from 'shared/index';
import { GaugeConfig } from '@ant-design/plots/es/components/gauge';
import { Progress, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface IDoctorDashboardOptions {
   id: number;
   doctor: IDoctor;
}

const getGaugeConfig = (percent: number): GaugeConfig => {
   return {
      height: 200,
      percent: percent / 100,
      range: {
         color: 'l(0) 0:#B8E1FF 1:#3D76DD'
      },
      startAngle: Math.PI,
      endAngle: 2 * Math.PI,
      indicator: null,
      statistic: {
         title: {
            offsetY: -36,
            style: {
               fontSize: '36px',
               color: '#4B535E'
            },
            formatter: () => `${percent}`
         },
         content: {
            style: {
               fontSize: '18px',
               lineHeight: '44px',
               color: '#4B535E'
            },
            formatter: () => 'Процент обязательных направлений'
         }
      }
   };
};

const DoctorDashboard = (props: IDoctorDashboardOptions) => {
   const config = useMemo(() => {
      return props.doctor
         ? getGaugeConfig(props.doctor.percent)
         : ({} as GaugeConfig);
   }, [props.doctor, props.id]);

   const columns: ColumnsType<IPatient> = useMemo(
      () => [
         {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name'
         },
         {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            width: '10%'
         },
         {
            title: 'Диагноз',
            dataIndex: 'diagnosis',
            key: 'diagnosis',
            width: '10%'
         },
         {
            title: 'Процент корректности',
            dataIndex: 'value',
            key: 'value',
            width: '15%',
            render: (_, record) => <Progress percent={record.percent} />
         },
         {
            title: 'Направления',
            width: '20%',
            render: (_, record) => {
               return (
                  <div>
                     {record.direction.map(({ name }) => (
                        <div>{name}</div>
                     ))}
                  </div>
               );
            }
         },
         {
            title: 'Направления по приказу',
            width: '20%',
            render: (_, record) => {
               return (
                  <div>
                     {record.requiredByDiagnosis.map(({ name }) => (
                        <div>{name}</div>
                     ))}
                  </div>
               );
            }
         }
      ],
      [props.doctor]
   );

   const data = useMemo(() => {
      return props.doctor?.patients || [];
   }, [props.doctor]);

   return (
      <div>
         <Gauge className={'tw-pb-5'} {...config} />
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

export default DoctorDashboard;
