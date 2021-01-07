import axios from 'axios';
import { axiosFetchCurrentCompany } from '../company/actions';

let token;
const authHeader = () => {
  let returnVal = null;
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token'));
    returnVal = { headers: { Authorization: 'Bearer ' + token } };
  }
  return returnVal;
};

export const axiosLoginUser = (user, dispatch) => {
  axios
    .post('http://localhost:3010/auth/login', {
      email: user.email,
      password: user.password,
      //remember: user.rememberMe
    })
    .then(function (response) {
      localStorage.setItem('token', JSON.stringify(response.data.token));

      dispatch({
        type: 'setUser',
        payload: response.data.user,
      });
    })
    .catch(function (error) {
      console.log(error);
      dispatch({
        type: 'setSignInError',
      });
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
      axiosLoginUser(user, dispatch);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const axiosAddUserToCompany = (userId, dispatch) => {
  axios
  .post(`http://localhost:3010/user/${userId}/addCompany`,{
    company_id: localStorage.getItem('currentCompany')
  }, authHeader())
  .then((resp) => {
    console.log(resp)
    axiosFetchCurrentCompany(dispatch)
  })
  .catch(console.log)
}

export const axiosRegisterArtist = (user, dispatch) => {
  axios
    .post('http://localhost:3010/auth/register', {
      email: user.email,
      password: user.password,
      accname: user.accname,
      contact: user.contact,
      is_artist: true,
      link: user.link,
    })
    .then(function (response) {
      console.log(response)
      axiosAddUserToCompany(response.data.user._id, dispatch)
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const axiosFetchUser = (dispatch) => {
  axios
    .get('http://localhost:3010/auth/checkToken', authHeader())
    .then((resp) => {
      dispatch({
        type: 'setUser',
        payload: resp.data.user,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const axiosGetAllUsers = (dispatch) => {
  axios
    .get('http://localhost:3010/user/all', authHeader())
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: 'fetchAllUsers',
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
