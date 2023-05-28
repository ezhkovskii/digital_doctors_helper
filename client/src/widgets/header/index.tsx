import React, { FC, memo, useCallback, useEffect } from 'react';
import Layout from 'antd/es/layout';
import Skeleton from 'antd/es/skeleton';
import Button from 'antd/es/button';
import { default as Title } from 'antd/es/typography/Title';
import { default as ArrowLeftOutlined } from '@ant-design/icons/lib/icons/ArrowLeftOutlined';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

interface IHeaderOptions {
   colorBgContainer: string;
   collapsed: boolean;
   setCollapsed: Function;
   title?: string;
   titleLoading?: boolean;
   backButtonPath?: string;
   rightTemplate: JSX.Element;
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
      <Header
         className={'tw-flex'}
         style={{ padding: 0, background: props.colorBgContainer }}
      >
         <div className={'tw-flex tw-justify-between'}>
            <div className={'tw-flex tw-pl-5 tw-items-center'}>
               {props.backButtonPath && (
                  <div className={'tw-flex tw-grow tw-flex-col'}>
                     <Button type="text" onClick={navBackButton}>
                        <ArrowLeftOutlined />
                     </Button>
                  </div>
               )}
               <div
                  className={`tw-w-full tw-pl-1 ${
                     props.rightTemplate ? 'tw-mt-2' : 'tw-mt-3'
                  }`}
               >
                  {props.titleLoading ? (
                     <div className={'tw-h-full tw-w-1/3 tw-pt-2'}>
                        <Skeleton paragraph={false} />
                     </div>
                  ) : (
                     <Title level={3}>{props.title}</Title>
                  )}
               </div>
            </div>
            <div className={'tw-pr-5'}>{props.rightTemplate}</div>
         </div>
      </Header>
   );
});

Main.defaultProps = {
   title: `Digital Doctor's Helper`
};

export default Main;
