import axios from 'axios';

const baseURL = 'http://37.18.110.142:8000/';

const axiosInst = axios.create({baseURL});

export default axiosInst;