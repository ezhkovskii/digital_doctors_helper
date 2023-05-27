import React, { FC, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from './api';

const LoginPage: FC = () => {
   const navigate = useNavigate();

   const onFinish = useCallback((values: any) => {
      login(values.username, values.password).then(() => {
         navigate('/');
      });
   }, []);

   return (
      <div
         className={
            'tw-flex tw-grow tw-justify-center tw-items-center tw-h-screen'
         }
      >
         <div
            className={
               'tw-bg-stone-100 tw-pr-6 tw-pt-6 tw-pl-6 tw-shadow-lg tw-rounded-md'
            }
         >
            <Form
               name="normal_login"
               className="login-form"
               initialValues={{ remember: true }}
               onFinish={onFinish}
            >
               <Form.Item
                  name="username"
                  rules={[
                     { required: true, message: 'Необходимо ввести логин' }
                  ]}
               >
                  <Input prefix={<UserOutlined />} placeholder="Логин" />
               </Form.Item>
               <Form.Item
                  name="password"
                  rules={[
                     { required: true, message: 'Необходимо ввести пароль' }
                  ]}
               >
                  <Input
                     prefix={<LockOutlined />}
                     type="password"
                     placeholder="Пароль"
                  />
               </Form.Item>

               <Form.Item>
                  <Button
                     type="primary"
                     htmlType="submit"
                     className="login-form-button"
                  >
                     Войти
                  </Button>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default LoginPage;
