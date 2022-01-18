import axios from 'axios';
import { store } from '../redux/store';

const getPost = () => {
  const userToken = store.getState().data.token;

  if (!userToken) return;

  return axios({
    method: 'get',
    url: 'https://devapi.cuccu.vn/cuccu.api/Feeds?key=&type=1&offset=0&limit=100&sortField=&isAsc=false&pin=false',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default getPost;
