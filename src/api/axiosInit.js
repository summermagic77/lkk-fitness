import axios from 'axios';
import https from 'https';

const baseDomain = 'http://35.201.133.162';
const basePort = 8085;
const baseURL = `${baseDomain}:${basePort}`;

export default axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
