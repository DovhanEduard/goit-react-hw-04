import axios from 'axios';

export const getImagesByValue = async (page, searchValue) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=OENp_TSYFm3eWIima9PMumghXbRwh14LV4MW7SQ5VnY&query=${searchValue}&page=${page}`
  );

  return data;
};
