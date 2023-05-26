import React, { FC, memo } from 'react';
import { Empty } from 'antd';
import UploadButton from 'entities/uploadButton';

interface IEmptyViewOptions {
   className?: string;
}

const Main: FC<IEmptyViewOptions> = memo((props: IEmptyViewOptions) => {
   return (
      <Empty
         className={props.className}
         image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
         imageStyle={{ height: 100 }}
         description={<span>Отчеты не найдены</span>}
      >
         <UploadButton />
      </Empty>
   );
});

export default Main;
