import React, { FC, memo, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'antd/es/alert';
import Table from 'antd/es/table';
import Progress from 'antd/es/progress';
import Divider from 'antd/es/divider';
import Space from 'antd/es/space';
import { ColumnsType } from 'antd/es/table';
import Bar from '@ant-design/plots/es/components/bar';
import Pie from '@ant-design/plots/es/components/pie';
import { IDashboardOptions } from '../lib/interfaces';

const DepartmentDashboard: FC<IDashboardOptions> = memo(
   (props: IDashboardOptions) => {
      const navigate = useNavigate();
      const data = useMemo(() => {
         const res: { posId: string; position: string; value: number }[] = [];
         const percentByDepartment = props.report?.percentByDepartment;
         if (percentByDepartment) {
            Object.keys(percentByDepartment).forEach((key) => {
               res.push({
                  posId: key,
                  position: props.report.positions[key],
                  value: percentByDepartment[key]
               });
            });
         }
         return res;
      }, [props.report]);

      const pieData = useMemo(() => {
         return props.report?.reportsTypeCount?.all || [];
      }, [props.report]);

      const columns: ColumnsType<{
         posId: string;
         position: string;
         value: number;
      }> = useMemo(
         () => [
            {
               title: 'Должности',
               dataIndex: 'position',
               key: 'position'
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
                  <Space data-html2canvas-ignore="true" size="middle">
                     <a onClick={openReport.bind(this, record.posId)}>
                        Открыть отчет
                     </a>
                  </Space>
               )
            }
         ],
         [props.report]
      );

      const openReport = useCallback(
         (position: string) => {
            navigate({
               pathname: `/report/${props.reportId}`,
               search: `tab=doctors&position=${position}`
            });
         },
         [props.report, props.reportId]
      );

      return (
         <>
            <Alert
               data-html2canvas-ignore="true"
               className={'tw-mb-6'}
               showIcon
               message="Если для диагноза, указанного в протоколе осмотра, не разработан стандарт оказания медицинской помощи, то такие протоколы исключаются из анализа."
               type="warning"
            />
            <div className={'tw-flex tw-grow'}>
               <Bar
                  className={'tw-pb-5 tw-w-2/3'}
                  height={300}
                  data={data}
                  xField={'value'}
                  yField={'position'}
                  seriesField={'position'}
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
