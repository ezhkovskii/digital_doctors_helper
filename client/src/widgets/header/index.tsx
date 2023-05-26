import React, { FC, memo, useCallback, useEffect } from 'react';
import { Layout, Skeleton, Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const { Header } = Layout;

interface IHeaderOptions {
   colorBgContainer: string;
   collapsed: boolean;
   setCollapsed: Function;
   title?: string;
   titleLoading?: boolean;
   backButtonPath?: string;
}

const Main: FC<IHeaderOptions> = memo((props: IHeaderOptions) => {
   const navigate = useNavigate();
   useEffect(() => {
      document.title = props.title;
   }, []);

   const navBackButton = useCallback(() => {
      navigate(props.backButtonPath);
   }, [props.backButtonPath]);

   return (
      <Header style={{ padding: 0, background: props.colorBgContainer }}>
         <div className={'tw-flex tw-items-baseline tw-h-full tw-pl-5 tw-mt-4'}>
            {props.backButtonPath && (
               <Button type="text" onClick={navBackButton}>
                  <ArrowLeftOutlined />
               </Button>
            )}
            <div className={'tw-w-full tw-self-start tw-pl-1'}>
               {props.titleLoading ? (
                  <div className={'tw-h-full tw-w-1/3 tw-pt-2'}>
                     <Skeleton paragraph={false} />
                  </div>
               ) : (
                  <Title level={3}>{props.title}</Title>
               )}
            </div>
         </div>
      </Header>
   );
});

Main.defaultProps = {
   title: 'Digital Doctors Helper'
};

export default Main;
