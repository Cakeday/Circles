import axios from 'axios'

export const checkLoggedIn = async () => {
    const response = await axios.get('/api/user/checkSession')
    const user = response.data;
    let preloadedState = {};
    if (user) {
      preloadedState = {
        signUp: user
      };
    }
    return preloadedState;
  };