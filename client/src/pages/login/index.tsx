import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import { default as UserOutlined } from '@ant-design/icons/lib/icons/UserOutlined';
import { default as LockOutlined } from '@ant-design/icons/lib/icons/LockOutlined';
import { login } from './api';
import { recreateAxiosInst } from 'shared/index';

const LoginPage: FC = () => {
   const navigate = useNavigate();

   const onFinish = useCallback((values: any) => {
      login(values.username, values.password).then(() => {
         recreateAxiosInst();
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
