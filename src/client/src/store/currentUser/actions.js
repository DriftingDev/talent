import axios from 'axios';

const authHeader = { headers: {"Authorization" : "Bearer " + JSON.parse(token)} } 

export const axiosLoginUser = (user, dispatch) => {
  axios
    .post('http://localhost:3010/auth/login', {
      email: user.email,
      password: user.password,
      remember: user.rememberMe
    })
    .then(function (response) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      console.log(localStorage.getItem('token'))

      dispatch({
        type: 'setUser',
        payload: response.data.user
      });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
        type: 'setSignInError'
      })
    });
};

export const axiosRegisterUser = (user, dispatch) => {
  axios
    .post('http://localhost:3010/auth/register', {
      email: user.email,
      password: user.password,
      accname: user.accname,
    })
    .then(function (response) {
      localStorage.setItem('token', JSON.stringify(response.token));
      console.log(localStorage.getItem('token'));
      dispatch({
        type: 'setUser',
        payload: response.data.user,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const axiosFetchUser = (dispatch) => {
  const token = localStorage.getItem('token')
  axios
    .get('http://localhost:3010/auth/checkToken',  authHeader)
    .then((resp) => {
      console.log(resp)
      dispatch({
        type: 'setUser',
        payload: resp.data.user
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}
