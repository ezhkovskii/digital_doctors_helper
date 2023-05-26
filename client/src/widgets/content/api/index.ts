export interface IReport {
   reportId: number;
   name: string;
   date: string;
}

const getReports = (): Promise<IReport[]> => {
   return new Promise((resolve, reject) => {
      const reports = localStorage.getItem('reports');
      let res: IReport[];
      if (reports) {
         res = JSON.parse(reports);
      }
      resolve(res);
   });
};

const deleteReport = (reportId: number): Promise<boolean> => {
   return new Promise((resolve, reject) => {
      const reports = localStorage.getItem('reports');
      let result = false;
      if (reports) {
         const reportsNormal = JSON.parse(reports);
         if (reportsNormal.length) {
            for (let index = 0; index < reportsNormal.length; index++) {
               const item = reportsNormal[index];
               if (item.reportId === reportId) {
                  reportsNormal.splice(index, 1);
                  localStorage.setItem(
                     'reports',
                     JSON.stringify(reportsNormal)
                  );
                  result = true;
                  break;
               }
            }
         }
      }
      resolve(result);
   });
};

export { getReports, deleteReport };
