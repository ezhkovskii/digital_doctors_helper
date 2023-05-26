import React, { FC, memo, useCallback, useState } from 'react';
import { Modal, Input, Button, Upload, Form } from 'antd';
import { FormOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadReport } from './api';
import { useNavigate } from 'react-router-dom';

const { Dragger } = Upload;

interface IModalOptions {
   open: boolean;
   setOpen: Function;
}

interface IFormData {
   name: string;
   file: UploadFile;
}

const Main: FC<IModalOptions> = memo((props: IModalOptions) => {
   const [fileList, setFileList] = useState([]);
   const [uploading, setUploading] = useState(false);
   const navigate = useNavigate();

   const beforeUpload = useCallback(
      (file: UploadFile) => {
         setFileList([...fileList, file]);
         return false;
      },
      [fileList]
   );

   const onRemove = useCallback(
      (file: UploadFile) => {
         const index = fileList.indexOf(file);
         const newFileList = fileList.slice();
         newFileList.splice(index, 1);
         setFileList(newFileList);
      },
      [fileList]
   );

   const handleUpload = useCallback(
      (data: IFormData) => {
         const formData = new FormData();
         formData.append('files[]', fileList[0]);
         setUploading(true);
         uploadReport(formData, data.name)
            .then(({ result, reportId }) => {
               setFileList([]);
               const currentReports = JSON.parse(
                  localStorage.getItem('reports')
               );
               const newReports = [
                  {
                     reportId,
                     name: data.name,
                     date: new Date()
                  }
               ];
               localStorage.setItem(
                  'reports',
                  JSON.stringify(
                     currentReports
                        ? [...currentReports, ...newReports]
                        : newReports
                  )
               );
               navigate(`/report/${reportId}`);
            })
            .finally(() => {
               setUploading(false);
            });
      },
      [fileList]
   );

   return (
      <Modal
         className={'tw-w-1/3'}
         title="Загрузить отчет"
         centered
         open={props.open}
         onCancel={() => props.setOpen(false)}
         footer={null}
      >
         <Form className={'tw-pt-2'} onFinish={handleUpload}>
            <Form.Item
               name="name"
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: 'Необходимо заполнить название отчета!'
                  }
               ]}
            >
               <Input
                  placeholder="Введите название отчета"
                  prefix={<FormOutlined />}
               />
            </Form.Item>
            <Form.Item name="file">
               <Dragger
                  accept=".xls, .xlsx"
                  multiple={false}
                  maxCount={1}
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onRemove={onRemove}
               >
                  <p className="ant-upload-drag-icon">
                     <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                     Нажмите сюда или перенесите отчет в эту зону
                  </p>
                  <p className="ant-upload-hint">Поддерживаемый формат .xlsx</p>
               </Dragger>
            </Form.Item>
            <Form.Item>
               <div className={'tw-flex'}>
                  <Button
                     loading={uploading}
                     disabled={fileList.length === 0}
                     htmlType="submit"
                     type="primary"
                  >
                     Загрузить
                  </Button>
               </div>
            </Form.Item>
         </Form>
      </Modal>
   );
});

export default Main;
