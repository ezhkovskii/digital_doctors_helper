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
import { getDiagnosis, IDiagnosis } from './api';

interface IContentOptions {
   loading: boolean;
   setLoading: Function;
}

const DiagnosisContent: FC<IContentOptions> = memo((props: IContentOptions) => {
   const [diagnosis, setDiagnosis] = useState([]);

   useEffect(() => {
      getDiagnosis().then((res) => {
         props.setLoading(false);
         setDiagnosis(res);
      });
   }, []);

   const columns: ColumnsType<IDiagnosis> = useMemo(
      () => [
         {
            title: 'Код',
            dataIndex: 'code',
            key: 'code'
         },
         {
            title: 'Диагноз',
            dataIndex: 'name',
            key: 'name'
         },
         {
            title: 'Действия',
            key: 'action',
            width: '15%',
            render: (_, record) => (
               <Space size="middle">
                  <a onClick={removeItem.bind(this, record.code)}>Удалить</a>
               </Space>
            )
         }
      ],
      [diagnosis]
   );

   const removeItem = useCallback(
      (id: number) => {
         //
      },
      [diagnosis]
   );

   return (
      <>
         {!props.loading && (
            <div>
               {diagnosis.length ? (
                  <div className={'tw-grow'}>
                     <Table
                        rootClassName={'tw-flex tw-flex-col tw-grow'}
                        columns={columns}
                        dataSource={diagnosis}
                        pagination={false}
                     />
                  </div>
               ) : (
                  <div>Список диагнозов пуст</div>
               )}
            </div>
         )}
      </>
   );
});

export default DiagnosisContent;
