import axios from 'axios';
import { store } from '../redux/store';

const deletePost = (idPost: number) => {
  const userToken = store.getState().data.token;

  if (!userToken) return;

  return axios({
    method: 'delete',
    url: `https://devapi.cuccu.vn/cuccu.api/Feeds/${idPost}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default deletePost;
