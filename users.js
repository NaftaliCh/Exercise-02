const axios = require('axios');

module.exports = {
  getUsers: async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};