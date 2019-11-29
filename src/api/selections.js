import axios from './axiosInit';

const uri = '/parameter/getSelection/';
const cors = 'https://cors-anywhere.herokuapp.com/';

export default {
  get() {
    return axios.get(`${cors}${uri}`);
  },
};
