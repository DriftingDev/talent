import axios from 'axios';

let token;
let authHeader;

if (localStorage.getItem('token')) {
  token = JSON.parse(localStorage.getItem('token'))
  authHeader = { headers: {"Authorization" : "Bearer " + token} } 
}

export const axiosLoginUser = (user, dispatch) => {
  axios
    .post('http://localhost:3010/auth/login', {
      email: user.email,
      password: user.password
      //remember: user.rememberMe
    })
    .then(function (response) {
      localStorage.setItem('token', JSON.stringify(response.data.token));

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
    axios
      .get('http://localhost:3010/auth/checkToken',  authHeader)
      .then((resp) => {
        dispatch({
          type: 'setUser',
          payload: resp.data.user
        })
      })
      .catch(function (error) {
        console.log(error);
      });
}
