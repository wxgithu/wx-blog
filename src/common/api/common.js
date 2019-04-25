import { request, datasetUrl } from '@/utils/request';

const ACCOUNT_BASE_URL = `${datasetUrl}/accounts/v1/account`;

export default {
    // 获取省市县的代码集
    fetchRegion() {
        return request.get(`${ACCOUNT_BASE_URL}/region/0`);
    },
    // 获取全球国家的代码集
    fetchArea() {
        return request.get(`${ACCOUNT_BASE_URL}/country_code`);
    },
    fileUpload(params) {
        return request.post(`${datasetUrl}/communals/v1/file`, params);
    },
};
