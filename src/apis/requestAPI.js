import axios from 'axios';
import { getSessionToken } from '../utility/common';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default axios.create({
  baseURL: `${BASE_URL}/timeoff`,
  headers: {
    Authorization: `Bearer ${getSessionToken()}`,
  },
  withCredentials: true,
});