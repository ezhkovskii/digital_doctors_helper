import React, {
   FC,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import { ColumnsType } from 'antd/es/table';
import EmptyView from 'entities/emptyView';
import UploadButton from 'entities/uploadButton';
import { deleteReport, getReports, IReport } from './api';

import './index.css';

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
            dataIndex: 'updated_at',
            key: 'updated_at',
            width: '20%',
            render: (_, record) => {
               const date = new Date(record.updated_at);
               return <div>{date.toLocaleString()}</div>;
            }
         },
         {
            title: 'Действия',
            key: 'action',
            width: '15%',
            render: (_, record) => (
               <Space size="middle">
                  <a onClick={openReport.bind(this, record.id)}>Открыть</a>
                  <a onClick={removeItem.bind(this, record.id)}>Удалить</a>
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
         deleteReport(reportId).then(() => {
            getReports().then((data) => setReports(data));
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
