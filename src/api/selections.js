import axios from './axiosInit';

const uri = '/parameter/getSelection/';

export default {
  get() {
    return axios.get(`${uri}`);
  },
};
