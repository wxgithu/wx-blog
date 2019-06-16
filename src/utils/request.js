// import axios from 'axios';

// export const request = axios.create({
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         'Cache-Control': 'no-cache,no-store',
//         Pragma: 'no-cache',
//     },
//     withCredentials: true,
// });

// request.interceptors.request.use((config) => {
//     const newConfig = config;
//     newConfig.headers.Authorization = localStorage.getItem('token');
//     return newConfig;
// });
// request.interceptors.response.use((response) => {
//     if (!response || response.status !== 200) {
//         return Promise.reject(new Error(`error code: ${response.status || 0}`));
//     }
//     if (response.data.code && response.data.code !== 200) {
//         return Promise.reject(response.data);
//     }
//     return response.data;
// }, (error) => {
//     const { status, data } = error.response || {};
//     if (status === 400) {
//         return Promise.reject(data);
//     }
//     return Promise.reject(error);
// });