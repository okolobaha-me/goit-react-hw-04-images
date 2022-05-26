import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  per_page: 12,
  orientation: 'horizontal',
  image_type: 'photo',
  key: '25200959-586511bb06bd2df2dfd3be190',
};

export async function getPhotosByKey(search, page = 1) {
  const res = await axios.get(`/?q=${search}&page=${page}`);

  return res.data.hits;
}
