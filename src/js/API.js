import axios from 'axios';
import { PER_PAGE } from './globalConstants';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  per_page: PER_PAGE,
  orientation: 'horizontal',
  image_type: 'photo',
  key: '25200959-586511bb06bd2df2dfd3be190',
};

export async function getPhotosByKey(search, page = 1) {
  const res = await axios.get(`/?q=${search}&page=${page}`);

  return res.data.hits;
}
