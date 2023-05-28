import React, {
   FC,
   memo,
   useCallback,
   useEffect,
   useMemo,
   useState
} from 'react';
import Space from 'antd/es/space';
import Table from 'antd/es/table';
import { ColumnsType } from 'antd/es/table';
import { deleteReferral, getReferral, IReferral } from './api';

interface IContentOptions {
   loading: boolean;
   setLoading: Function;
}

const ReferralList: FC<IContentOptions> = memo((props: IContentOptions) => {
   const [referral, setReferral] = useState([]);

   useEffect(() => {
      getReferral().then((res) => {
         props.setLoading(false);
         setReferral(res);
      });
   }, []);

   const columns: ColumnsType<IReferral> = useMemo(
      () => [
         {
            title: 'Название',
            dataIndex: 'name',
            key: 'name'
         },
         {
            title: 'Синонимы',
            render: (_, record) => {
               return (
                  <div>
                     {record.synonyms.map((name) => (
                        <div>{name}</div>
                     ))}
                  </div>
               );
            }
         },
         {
            title: 'Код услуги',
            dataIndex: 'service_code',
            key: 'service_code'
         },
         {
            title: 'Диагнозы',
            render: (_, record) => {
               return (
                  <div>
                     {record.diagnoses.map((name) => (
                        <div>{name}</div>
                     ))}
                  </div>
               );
            }
         },
         {
            title: 'Действия',
            key: 'action',
            width: '15%',
            render: (_, record) => (
               <Space size="middle">
                  <a onClick={removeItem.bind(this, record.id)}>Удалить</a>
               </Space>
            )
         }
      ],
      [referral]
   );

   const removeItem = useCallback(
      (id: number) => {
         deleteReferral(id).then(() => {
            getReferral().then((res) => {
               setReferral(res);
            });
         });
      },
      [referral]
   );

   return (
      <>
         {!props.loading && (
            <div>
               {referral.length ? (
                  <div className={'tw-grow'}>
                     <Table
                        rootClassName={'tw-flex tw-flex-col tw-grow'}
                        columns={columns}
                        dataSource={referral}
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

export default ReferralList;
