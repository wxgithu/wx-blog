import axios from 'axios';

let DATASET_URL = '';
let LABEL_URL = '';

switch (process.env.NODE_ENV) {
    case 'production':
        DATASET_URL = 'https://axer.ailab.100tal.com';
        LABEL_URL = DATASET_URL;
        break;
    case 'test-train':
        DATASET_URL = 'http://axer-train.platform.facethink.com';
        LABEL_URL = DATASET_URL;
        break;
    case 'development':
        DATASET_URL = 'http://pt-dev.platform.facethink.com';
        LABEL_URL = 'http://10.1.12.41';
        break;
    case 'test-data':
        DATASET_URL = 'http://axer-data.platform.facethink.com';
        LABEL_URL = DATASET_URL;
        break;
    default:
        break;
}
export const datasetUrl = DATASET_URL;
export const labelUrl = LABEL_URL;
export const request = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Cache-Control': 'no-cache,no-store',
        Pragma: 'no-cache',
    },
    withCredentials: true,
});

request.interceptors.request.use((config) => {
    const newConfig = config;
    newConfig.headers.Authorization = localStorage.getItem('token');
    return newConfig;
});
request.interceptors.response.use((response) => {
    if (!response || response.status !== 200) {
        return Promise.reject(new Error(`error code: ${response.status || 0}`));
    }
    if (response.data.code && response.data.code !== 200) {
        return Promise.reject(response.data);
    }
    return response.data;
}, (error) => {
    const { status, data } = error.response || {};
    if (status === 400) {
        return Promise.reject(data);
    }
    return Promise.reject(error);
});
