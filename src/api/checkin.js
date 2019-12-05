import axios from './axiosInit';

const uri = '/checkin';

export default {
  saveCheckin(params) {
    return axios.post(`${uri}/saveCheckin`, { params });
  },
  saveCheckout(params) {
    return axios.post(`${uri}/saveCheckout`, { params });
  },
};
