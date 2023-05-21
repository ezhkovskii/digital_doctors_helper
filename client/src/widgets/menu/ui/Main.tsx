import React, { FC, memo } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

interface IMainOptions {
   collapsed: boolean;
}

const Main: FC<IMainOptions> = memo((props: IMainOptions) => {
   debugger;
   return (
      <Sider trigger={null} collapsible collapsed={props.collapsed}>
         <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
               {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'Отчеты'
               }
            ]}
         />
      </Sider>
   );
});

export default Main;
