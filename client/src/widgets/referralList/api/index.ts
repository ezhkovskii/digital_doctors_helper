import { axiosInst, showError } from 'shared/index';

interface IReferral {
   name: string;
   code: string;
   synonyms: string[];
   diagnoses: string[];
}

const getReferral = async (): Promise<IReferral[]> => {
   let res = [];
   try {
      const rs = await axiosInst.get('/medical_appointments');
      res = rs.data;
   } catch (error) {
      showError('Ошибка при получении списка назначений', error);
   }
   return res;
};

export { getReferral, IReferral };
