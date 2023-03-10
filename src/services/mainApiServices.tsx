import axios from "axios";

const API_KEY = "OSBA9mpPTupnAJ5OvdFjKGtrEhkGN4X0";
const API_URL = `https://api.nytimes.com`;

export const getFunc = async (url, handleData) => {
  return axios
    .get(`${API_URL}/${url}&api-key=${API_KEY}`)
    .then(response => {
      handleData(response?.data);
    })
    .catch(error => {
      console.error(error);
    });
};
