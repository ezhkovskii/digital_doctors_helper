import axios from 'axios';
import { redirect } from 'react-router-dom';

const baseURL = 'http://37.18.110.142:8000/api/v1';

const axiosInst = axios.create({
   headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
   },
   baseURL
});

const checkAuth = async (): Promise<Response | null> => {
   try {
      return await new Promise((resolve) => {
         resolve(localStorage.getItem('token') ? null : redirect('/login'));
      });
   } catch (error) {}
};

export { axiosInst, checkAuth };
