import axios from 'axios';
import { store } from '../redux/store';

const getComment = (idComment: number) => {
  const userToken = store.getState().data.token;

  if (!userToken) return;

  return axios({
    method: 'get',
    url: `https://devapi.cuccu.vn/cuccu.api/Comments/${idComment}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default getComment;
