import React, { useCallback, useState } from 'react';
import Button from 'antd/es/button';
import Popover from 'antd/es/popover';
import { default as CloudDownloadOutlined } from '@ant-design/icons/lib/icons/CloudDownloadOutlined';

interface IExportButton {
   exportPdf?: Function;
}

const ExportButton = (props: IExportButton) => {
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
            <a onClick={props.exportPdf.bind(true)}>
               Выгрузить текущую страницу
            </a>
            <a onClick={props.exportPdf.bind(this)}>Выгрузить весь отчет</a>
            <a onClick={props.exportPdf.bind(this)}>Скачать оригинал отчета</a>
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
            <div className={'tw-flex'}>
               <div className={'tw-pr-2'}>Выгрузить отчет</div>
               <CloudDownloadOutlined className={'tw-text-lg'} />
            </div>
         </Button>
      </Popover>
   );
};

export default ExportButton;
