import React, { FC, memo, useState } from 'react';
import { Button } from 'antd';
import UploadModal from 'widgets/uploadModal';

interface IUploadButtonOptions {
   className?: string;
}

const UploadButton: FC<IUploadButtonOptions> = memo(
   (props: IUploadButtonOptions) => {
      const [open, setOpen] = useState(false);
      return (
         <div className={props.className}>
            <Button type="primary" onClick={() => setOpen(true)}>
               Загрузить отчет
            </Button>
            <UploadModal open={open} setOpen={setOpen} />
         </div>
      );
   }
);

export default UploadButton;
