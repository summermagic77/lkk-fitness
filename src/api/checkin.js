import axios from './axiosInit';

const uri = '/checkin';

export default {
  saveCheckin(data) {
    return axios.post(`${uri}/saveCheckin`, data);
  },
  saveCheckout(params) {
    return axios.post(`${uri}/saveCheckout`, { params });
  },
};
