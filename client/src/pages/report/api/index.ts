import { IReport } from 'shared/index';
const getReport: (reportId: string) => Promise<IReport> = (
   reportId: string
) => {
   return new Promise((resolve, reject) => {
      const reports = JSON.parse(localStorage.getItem('reports'));
      for (let index = 0; index < reports.length; index++) {
         const report = reports[index];
         if (report.reportId == reportId) {
            resolve({
               reportId: report.reportId,
               name: report.name
            });
            break;
         }
      }
   });
};

export { getReport };
