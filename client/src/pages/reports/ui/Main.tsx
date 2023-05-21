import React, { FC, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { Menu } from 'widgets/menu/index';
const { Header, Content } = Layout;

const Main: FC = () => {
   const [collapsed, setCollapsed] = useState(false);
   const {
      token: { colorBgContainer }
   } = theme.useToken();

   return (
      <Layout className={'tw-h-screen'}>
         <Menu collapsed={collapsed} />
         <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
               <Button
                  type="text"
                  icon={
                     collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => {
                     setCollapsed(!collapsed);
                  }}
                  style={{
                     fontSize: '16px',
                     width: 64,
                     height: 64
                  }}
               />
            </Header>
            <Content
               style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer
               }}
            >
               Content
            </Content>
         </Layout>
      </Layout>
   );
};

export default Main;
