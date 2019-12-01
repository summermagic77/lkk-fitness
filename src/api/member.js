import axios from './axiosInit';

const uri = '/member';

export default {
  getAll(memberType) {
    return axios.get(`${uri}/getAll`, { params: memberType });
  },
};
