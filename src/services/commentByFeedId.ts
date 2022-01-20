import axios from 'axios';
import { store } from '../redux/store';

const getCommentByFeedId = (idPost: number) => {
  const userToken = store.getState().data.token;

  if (!userToken) return;

  return axios({
    method: 'get',
    url: `https://devapi.cuccu.vn/cuccu.api/Comments/GetByFeed?idFeed=${idPost}&type=1&offset=0&limit=100&sortField=&isAsc=false`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default getCommentByFeedId;
