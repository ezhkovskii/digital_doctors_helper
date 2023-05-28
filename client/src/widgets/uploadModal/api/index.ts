import { axiosInst, showError } from 'shared/index';

const uploadReport = async (formData: FormData) => {
   try {
      const data = await axiosInst.post('/reports/', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      });
      return data.data.id;
   } catch (error) {
      showError('Не удалось загрузить отчет на сервер', error);
      throw error;
   }
};

export { uploadReport };
