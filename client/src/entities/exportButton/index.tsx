import React, { useCallback, useState } from 'react';
import Button from 'antd/es/button';
import Popover from 'antd/es/popover';
import { default as CloudDownloadOutlined } from '@ant-design/icons/lib/icons/CloudDownloadOutlined';
import { IReport } from 'shared/index';

interface IExportButton {
   exportPdf?: Function;
   report: IReport;
}

const ExportButton = (props: IExportButton) => {
   const [openExportDialog, setOpenExportDialog] = useState(false);

   const handleOpenChange = useCallback((newOpen: boolean) => {
      setOpenExportDialog(newOpen);
   }, []);

   const content = useCallback(() => {
      return (
         <div className={'tw-flex tw-flex-col'}>
            <a
               onClick={() =>
                  props.exportPdf({
                     currentPage: true,
                     report: props.report
                  })
               }
            >
               Выгрузить текущую страницу
            </a>
            <a
               onClick={() =>
                  props.exportPdf({
                     currentPage: false,
                     report: props.report
                  })
               }
            >
               Выгрузить весь отчет
            </a>
            <a
               onClick={() =>
                  props.exportPdf({
                     currentPage: true,
                     report: props.report
                  })
               }
            >
               Скачать оригинал отчета
            </a>
         </div>
      );
   }, [props.report]);

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
