import axios from 'axios';
import { store } from '../redux/store';

const getCurrentUser = () => {
  const userToken = store.getState().data.token;

  if (!userToken) return;

  return axios({
    method: 'get',
    url: 'https://devapi.cuccu.vn/cuccu.api/Users/GetCurrent',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default getCurrentUser;
