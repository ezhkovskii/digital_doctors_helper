import notification from 'antd/lib/notification';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const showError = (message: string, error: Error) => {
   notification.open({
      message,
      type: 'error',
      placement: 'bottomRight'
   });
   console.error(error);
};

const pageToPdf = async (page: HTMLElement, name: string) => {
   const canvas = await html2canvas(page);
   const imgWidth = 208;
   const pageHeight = 295;
   const imgHeight = (canvas.height * imgWidth) / canvas.width;
   let heightLeft = imgHeight;
   let position = 0;
   heightLeft -= pageHeight;
   const doc = new jsPDF('p', 'mm');
   doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '');
   while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '');
      heightLeft -= pageHeight;
   }
   doc.save(name);
};

export { showError, pageToPdf };
