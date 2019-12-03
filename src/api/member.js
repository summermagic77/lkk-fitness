import axios from './axiosInit';

const uri = '/member';

export default {
  getAll() {
    return axios.get(`${uri}/getAll`);
  },
  getByKey(type, params) {
    return axios.get(`${uri}/getByKey/${type}`, { params });
    // return axios({
    //   method: 'post',
    //   url: `${uri}/getByKey/${type}`,
    //   data,
    // });
  },
  getByType(memberType) {
    return axios.get(`${uri}/getByType/${memberType}`);
  },
  saveMember(params) {
    return axios.post(`${uri}/saveMember`, { params });
  },
};
