import axios from 'axios';

const baseDomain = 'http://35.201.133.162';
const basePort = 8085;
const baseURL = `${baseDomain}:${basePort}`;

export default axios.create({
  baseURL,
});
