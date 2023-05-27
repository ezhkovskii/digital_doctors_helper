import React, { useCallback, useState } from 'react';
import { Button, Popover } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';

const ExportButton = () => {
   const [openExportDialog, setOpenExportDialog] = useState(false);

   const hide = useCallback(() => {
      setOpenExportDialog(false);
   }, []);

   const handleOpenChange = useCallback((newOpen: boolean) => {
      setOpenExportDialog(newOpen);
   }, []);

   const content = useCallback(() => {
      return (
         <div className={'tw-flex tw-flex-col'}>
            <a onClick={hide}>Выгрузить текущую страницу</a>
            <a onClick={hide}>Выгрузить весь отчет</a>
         </div>
      );
   }, []);

   return (
      <Popover
         content={content}
         title="Выгрузить отчет"
         trigger="click"
         open={openExportDialog}
         onOpenChange={handleOpenChange}
      >
         <Button type="text">
            <FilePdfOutlined className={'tw-text-lg'} />
         </Button>
      </Popover>
   );
};

export default ExportButton;
