const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const getUserGroups = async (userId) => {
  const response = await axios.get(`${BASE_URL}/groups/user/${userId}`);
  return response.data;
}

const getGroup = async (groupId) => {
  const response = await axios.get(`${BASE_URL}/groups/${groupId}`);
  return response.data;
}

const createGroup = async ({name, id_user}) => {
  let data = {
    name,
    id_user
  }
  const response = await axios.post(`${BASE_URL}/groups`, data);
  return response.data;
}

const addUserToGroup = async (id_group, email_user ) => {
  const response = await axios.post(`${BASE_URL}/groups/${id_group}/users`, { email_user });
  return response.data;
}

module.exports = { getUserGroups, getGroup, createGroup, addUserToGroup };