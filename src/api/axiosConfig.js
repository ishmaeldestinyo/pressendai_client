import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})


export const getResult = (url) => axiosInstance.get(url);

export const postResult = (url, data) => axiosInstance.post(url, data);

export const putResult = (url, data) => axiosInstance.put(url, data);

export const deleteResult = (url) => axiosInstance.delete(url);


export default axiosInstance
