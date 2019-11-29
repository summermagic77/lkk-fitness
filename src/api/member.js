import axios from './axiosInit';

const uri = '/member/';

export default {
  getAll() {
    return axios.get(`${uri}/getAll`);
  },
};
