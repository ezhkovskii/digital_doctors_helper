import React, { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Dragger from 'antd/es/upload/Dragger';
import Form from 'antd/es/form';
import { default as FormOutlined } from '@ant-design/icons/lib/icons/FormOutlined';
import { default as InboxOutlined } from '@ant-design/icons/lib/icons/InboxOutlined';
import type { UploadFile } from 'antd/es/upload/interface';
import { uploadReport } from './api';

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
         formData.append('file', fileList[0]);
         formData.append('name', data.name);
         setUploading(true);
         uploadReport(formData)
            .then((id) => {
               setFileList([]);
               navigate(`/report/${id}`);
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
