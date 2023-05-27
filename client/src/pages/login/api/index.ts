import { axiosInst } from 'shared/index';
import { notification } from 'antd';

const login = async (username: string, password: string) => {
   try {
      const token = await axiosInst.post('/token/', {
         username,
         password
      });
      localStorage.setItem('token', token.data.token);
   } catch (error) {
      notification.open({
         message: 'Ошибка при авторизации',
         type: 'error',
         placement: 'bottomRight'
      });
   }
};

export { login };
