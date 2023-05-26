import React, {
   FC,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState
} from 'react';
import { Table, Space } from 'antd';
import EmptyView from 'entities/emptyView';
import './index.css';
import { deleteReport, getReports, IReport } from './api';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import UploadButton from 'entities/uploadButton';

interface IContentOptions {
   loading: boolean;
   setLoading: Function;
}

const Main: FC<IContentOptions> = memo((props: IContentOptions) => {
   const [reports, setReports] = useState([]);

   const navigation = useNavigate();

   useEffect(() => {
      getReports().then((res) => {
         props.setLoading(false);
         setReports(res);
      });
   }, []);

   const columns: ColumnsType<IReport> = useMemo(
      () => [
         {
            title: 'Название отчета',
            dataIndex: 'name',
            key: 'name'
         },
         {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            width: '20%',
            render: (_, record) => {
               const date = new Date(record.date);
               return <div>{date.toLocaleString()}</div>;
            }
         },
         {
            title: 'Действия',
            key: 'action',
            width: '15%',
            render: (_, record) => (
               <Space size="middle">
                  <a onClick={openReport.bind(this, record.reportId)}>
                     Открыть
                  </a>
                  <a onClick={removeItem.bind(this, record.reportId)}>
                     Удалить
                  </a>
               </Space>
            )
         }
      ],
      [reports]
   );

   const openReport = useCallback((reportId: number) => {
      navigation(`/report/${reportId}`);
   }, []);

   const removeItem = useCallback(
      (reportId: number) => {
         deleteReport(reportId).then((res) => {
            if (res) {
               for (let index = 0; index < reports.length; index++) {
                  const item = reports[index];
                  if (item.reportId === reportId) {
                     const clonedReports = [...reports];
                     clonedReports.splice(index, 1);
                     setReports(clonedReports);
                     break;
                  }
               }
            }
         });
      },
      [reports]
   );

   return (
      <>
         {!props.loading &&
            (reports?.length ? (
               <div className={'tw-grow'}>
                  <UploadButton className={'tw-flex tw-justify-end tw-pb-2'} />
                  <Table
                     rootClassName={'tw-flex tw-flex-col tw-grow'}
                     columns={columns}
                     dataSource={reports}
                     pagination={false}
                  />
               </div>
            ) : (
               <EmptyView
                  className={'tw-grow tw-flex tw-flex-col tw-justify-center'}
               />
            ))}
      </>
   );
});

export default Main;
