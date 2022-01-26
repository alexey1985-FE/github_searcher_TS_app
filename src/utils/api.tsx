import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'https://api.github.com',
	responseType: 'json',
});
 
export default axiosInstance;
