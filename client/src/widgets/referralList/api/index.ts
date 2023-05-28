import { axiosInst, showError } from 'shared/index';

interface IReferral {
   id: number;
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

const deleteReferral = async (id: number) => {
   let res = [];
   try {
      const rs = await axiosInst.delete(`/medical_appointments/${id}`);
      res = rs.data;
   } catch (error) {
      showError('Ошибка при удалении направления', error);
   }
   return res;
};

export { deleteReferral, getReferral, IReferral };
