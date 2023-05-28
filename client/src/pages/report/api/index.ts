import { axiosInst, IReport, showError } from 'shared/index';

const getReport = async (id: string): Promise<IReport> => {
   let res = {} as IReport;
   try {
      const rs = await axiosInst.get(`/reports/${id}`);
      res = rs.data;
   } catch (error) {
      showError('Ошибка при загрузке отчета', error);
   }
   return res;
};

export { getReport };
