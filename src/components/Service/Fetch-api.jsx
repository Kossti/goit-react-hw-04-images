// const API_KEY = '36293260-65e85cb95d6e75b440eadaf01';
// const URL = 'https://pixabay.com/api/';
// const pagination = 12;

// function FetchApi(namedQuery, page) {
//     return fetch(`${URL}?key=${API_KEY}&q=${namedQuery}&page=${page}&image_type=photo&orientation=horizontal&per_page=${pagination}`).then(response => response.json())
// }

// const API = {
//     FetchApi,
// }
// export default API;
// console.log(API);

import axios from 'axios';

export const FetchAPI = async (query, page) => {
  const response = await axios.get('https://pixabay.com/api/', {
    method: 'get',
    params: {
      key: '36293260-65e85cb95d6e75b440eadaf01',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: page,
    },
  });

  return response.data.hits;
};
