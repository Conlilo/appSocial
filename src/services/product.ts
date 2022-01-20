import axios from 'axios';
import { store } from '../redux/store';

const getProduct = () => {
  const userToken = store.getState().data.token;

  if (!userToken) return;

  return axios({
    method: 'get',
    url: 'https://devapi.cuccu.vn/cuccu.api/ProductRegs/Autocomplete?offset=0&limit=100',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default getProduct;
