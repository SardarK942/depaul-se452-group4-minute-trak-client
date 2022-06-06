import axios from 'axios';
import { getSessionToken } from '../utility/common';
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export default axios.create({
  baseURL: `localhost:8080/admin`,
  headers: {
    Authorization: `Bearer ${getSessionToken()}`,
  },
  withCredentials: true,
});
