const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const login = async ({email, password}) => {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
}

const register = async ({name, email, password}) => {
  const response = await axios.post(`${BASE_URL}/register`, { name, email, password });
  return response.data;
}

module.exports = { login, register };