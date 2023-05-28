import axios from 'axios';
import { redirect } from 'react-router-dom';

const baseURL = 'http://37.18.110.142:8000/api/v1';

const createAxiosInst = () => {
   return axios.create({
      headers: {
         Authorization: localStorage.getItem('token')
            ? `token ${localStorage.getItem('token')}`
            : ''
      },
      baseURL
   });
};

let axiosInst = createAxiosInst();

const recreateAxiosInst = () => {
   axiosInst = createAxiosInst();
};

const checkAuth = async (): Promise<Response | null> => {
   try {
      return await new Promise((resolve) => {
         resolve(localStorage.getItem('token') ? null : redirect('/login'));
      });
   } catch (error) {}
};

export { axiosInst, checkAuth, recreateAxiosInst };
