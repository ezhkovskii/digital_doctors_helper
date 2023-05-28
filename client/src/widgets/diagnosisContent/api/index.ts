import { axiosInst, showError } from 'shared/index';

interface IDiagnosis {
   id: number;
   name: string;
   code: string;
}

const getDiagnosis = async (): Promise<IDiagnosis[]> => {
   let res = [];
   try {
      const rs = await axiosInst.get('/diagnosis');
      res = rs.data;
   } catch (error) {
      showError('Ошибка при получении списка диагнозов', error);
   }
   return res;
};

const deleteDiagnosis = async (id: number) => {
   let res = [];
   try {
      const rs = await axiosInst.delete(`/diagnosis/${id}`);
      res = rs.data;
   } catch (error) {
      showError('Ошибка при удалении диагноза', error);
   }
   return res;
};

export { deleteDiagnosis, getDiagnosis, IDiagnosis };
