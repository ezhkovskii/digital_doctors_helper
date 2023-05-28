import { axiosInst, showError } from 'shared/index';
import notification from 'antd/lib/notification';

interface IDiagnosis {
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

export { getDiagnosis, IDiagnosis };
