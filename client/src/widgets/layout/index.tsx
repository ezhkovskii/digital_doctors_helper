import React, { FC, useState } from 'react';
import { Layout, theme, Spin, ConfigProvider } from 'antd';
import Menu from 'widgets/menu';
import Header from 'widgets/header';

const { Content } = Layout;

interface ILayoutPage {
   children: JSX.Element;
   currentPage: string[];
   loading: boolean;
   title?: string;
   titleLoading?: boolean;
   backButtonPath?: string;
}

const LayoutPage: FC<ILayoutPage> = (props: ILayoutPage) => {
   const {
      token: { colorBgContainer }
   } = theme.useToken();

   const [collapsed, setCollapsed] = useState(false);

   return (
      <ConfigProvider
         theme={{
            token: {
               colorPrimary: '#009db9'
            }
         }}
      >
         <Layout
            className={'tw-h-screen tw-overflow-x-hidden tw-overflow-y-auto'}
         >
            <Menu collapsed={collapsed} selectedKeys={props.currentPage} />
            <Layout style={{ marginLeft: 200 }}>
               <Header
                  backButtonPath={props.backButtonPath}
                  titleLoading={props.titleLoading}
                  title={props.title}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  colorBgContainer={colorBgContainer}
               />
               <Spin
                  style={{ maxHeight: '100%' }}
                  wrapperClassName={'tw-flex tw-grow widget__spin-wrapper'}
                  spinning={props.loading}
               >
                  <Content className={'tw-m-5 tw-p-5 tw-bg-white'}>
                     {props.children}
                  </Content>
               </Spin>
            </Layout>
         </Layout>
      </ConfigProvider>
   );
};

export default LayoutPage;
