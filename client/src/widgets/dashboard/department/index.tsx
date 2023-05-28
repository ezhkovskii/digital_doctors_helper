import React, { FC, memo, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'antd/es/alert';
import Table from 'antd/es/table';
import Progress from 'antd/es/progress';
import Divider from 'antd/es/divider';
import Space from 'antd/es/space';
import { ColumnsType } from 'antd/es/table';
import Bar from '@ant-design/plots/es/components/bar';
import Pie from '@ant-design/plots/es/components/pie';
import { IDashboardOptions } from '../lib/interfaces';

const DEPARTMENT_NAME = {
   CARDIO: 'Кардиология',
   NEUROLOGY: 'Неврология',
   OTOLARYNGOLOGY: 'Отоларингология'
};

const DEPARTMENT_ID = {
   [DEPARTMENT_NAME.CARDIO]: 'cardio',
   [DEPARTMENT_NAME.NEUROLOGY]: 'neurology',
   [DEPARTMENT_NAME.OTOLARYNGOLOGY]: 'otolaryngology'
};

const DepartmentDashboard: FC<IDashboardOptions> = memo(
   (props: IDashboardOptions) => {
      const navigate = useNavigate();
      const params = useParams();
      const data = useMemo(() => {
         const percentByDepartment = props.report?.percentByDepartment;
         return percentByDepartment
            ? [
                 {
                    department: DEPARTMENT_NAME.CARDIO,
                    value: percentByDepartment.cardio
                 },
                 {
                    department: DEPARTMENT_NAME.NEUROLOGY,
                    value: percentByDepartment.neurology
                 },
                 {
                    department: DEPARTMENT_NAME.OTOLARYNGOLOGY,
                    value: percentByDepartment.otolaryngology
                 }
              ]
            : [];
      }, [props.report]);

      const pieData = useMemo(() => {
         return props.report?.reportsTypeCount?.all || [];
      }, [props.report]);

      const columns: ColumnsType<{ department: string; value: number }> =
         useMemo(
            () => [
               {
                  title: 'Подразделение',
                  dataIndex: 'department',
                  key: 'department'
               },
               {
                  title: 'Процент корректности',
                  dataIndex: 'value',
                  key: 'value',
                  width: '30%',
                  render: (_, record) => <Progress percent={record.value} />
               },
               {
                  title: 'Действия',
                  key: 'action',
                  width: '15%',
                  render: (_, record) => (
                     <Space size="middle">
                        <a onClick={openReport.bind(this, record.department)}>
                           Открыть отчет
                        </a>
                     </Space>
                  )
               }
            ],
            [props.report]
         );

      const openReport = useCallback((department: string) => {
         navigate({
            pathname: `/report/${params.reportId}`,
            search: `tab=doctors&direction=${DEPARTMENT_ID[department]}`
         });
      }, []);

      return (
         <>
            <Alert
               className={'tw-mb-6'}
               showIcon
               message="В отчете найдены направления, которых нет в стандартах."
               type="warning"
            />
            <div className={'tw-flex tw-grow'}>
               <Bar
                  className={'tw-pb-5 tw-w-2/3'}
                  height={300}
                  data={data}
                  xField={'value'}
                  yField={'department'}
                  seriesField={'department'}
               />
               <Divider style={{ height: '300px' }} type="vertical" />
               <Pie
                  className={'tw-w-1/3'}
                  data={pieData}
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
         </>
      );
   }
);

export default DepartmentDashboard;
