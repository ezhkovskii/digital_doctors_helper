import React, { FC, memo, useCallback } from 'react';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import { default as UserOutlined } from '@ant-design/icons/lib/icons/UserOutlined';
import { default as OrderedListOutlined } from '@ant-design/icons/lib/icons/OrderedListOutlined';
import { default as FileTextOutlined } from '@ant-design/icons/lib/icons/FileTextOutlined';
import { useNavigate } from 'react-router-dom';
import { MenuInfo } from 'rc-menu/lib/interface';

const { Sider } = Layout;

const MENU_KEYS = {
   MAIN: 'main',
   REFERRAL: 'referral',
   DIAGNOSIS: 'diagnosis'
};

const MENU_PATHS = {
   [MENU_KEYS.MAIN]: '/',
   [MENU_KEYS.REFERRAL]: '/referral',
   [MENU_KEYS.DIAGNOSIS]: '/diagnosis'
};

interface IMainOptions {
   collapsed: boolean;
   selectedKeys: string[];
}

const Main: FC<IMainOptions> = memo((props: IMainOptions) => {
   const navigate = useNavigate();
   const onMenuClick = useCallback((menuInfo: MenuInfo) => {
      navigate(MENU_PATHS[menuInfo.key]);
   }, []);
   return (
      <Sider
         className={'tw-h-screen tw-fixed'}
         style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0
         }}
         trigger={null}
         collapsible
         collapsed={props.collapsed}
      >
         <Menu
            selectedKeys={props.selectedKeys}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['main']}
            onClick={onMenuClick}
            items={[
               {
                  key: MENU_KEYS.MAIN,
                  icon: <UserOutlined />,
                  label: 'Отчеты'
               },
               {
                  key: MENU_KEYS.REFERRAL,
                  icon: <OrderedListOutlined />,
                  label: 'Список назначений'
               },
               {
                  key: MENU_KEYS.DIAGNOSIS,
                  icon: <FileTextOutlined />,
                  label: 'Диагнозы'
               }
            ]}
         />
      </Sider>
   );
});

export default Main;
