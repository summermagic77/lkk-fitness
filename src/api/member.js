import axios from './axiosInit';

const uri = '/member';

export default {
  getAll() {
    return axios.get(`${uri}/getAll`);
  },
  getByCon(data) {
    return axios.post(`${uri}/getByCon/`, data);
  },
  getByKey(type, data) {
    return axios.post(`${uri}/getByKey/${type}`, data);
  },
  getByType(memberType) {
    return axios.get(`${uri}/getByType/${memberType}`);
  },
  saveMember(data) {
    return axios.post(`${uri}/saveMember`, data);
  },
  updateMember(data) {
    return axios.post(`${uri}/updateMember`, data);
  },
};
