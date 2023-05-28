import { axiosInst, showError } from 'shared/index';

export interface IReport {
   id: number;
   name: string;
   updated_at: string;
}

const getReports = async (): Promise<IReport[]> => {
   let res = [];
   try {
      const data = await axiosInst.get('/reports');
      res = data.data;
   } catch (error) {
      showError('Не удалось получить список отчетов', error);
   }
   return res;
};

const deleteReport = async (reportId: number): Promise<boolean> => {
   let res = false;
   try {
      const data = await axiosInst.delete(`/reports/${reportId}`);
      res = data.data;
   } catch (error) {
      showError('Не удалось удалить отчет', error);
   }
   return res;
};

export { getReports, deleteReport };
