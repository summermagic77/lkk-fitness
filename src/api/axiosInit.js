import axios from 'axios';
import https from 'https';

const cors = 'https://cors-anywhere.herokuapp.com/';
const baseDomain = 'http://35.201.133.162';
const basePort = 8085;
const baseURL = `${cors}${baseDomain}:${basePort}`;

export default axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
