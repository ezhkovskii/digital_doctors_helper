interface IReport {

}

const getReport = (reportId: number): Promise<IReport> => {
   return new Promise((resolve, reject) => {
      const reports = JSON.parse(localStorage.getItem('reports'));
      for (let index = 0; index < reports.length; index++) {
         const report = reports[index];
         if (report.reportId === reportId) {
            resolve({
               reportId,
               name: report.name
            });
         }
      }
   })
}

export { getReport }