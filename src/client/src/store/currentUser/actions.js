import axios from 'axios';
import { axiosFetchCurrentCompany } from '../company/actions';
import {API_URL, authHeader } from '../actionUtils'

export const axiosLoginUser = (user, dispatch) => {
  axios
    .post(`${API_URL}/auth/login`, {
      email: user.email,
      password: user.password,
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
    .post(`${API_URL}/auth/register`, {
      email: user.email,
      password: user.password,
      accname: user.accname,
    })
    .then(function (response) {
      axiosLoginUser(user, dispatch);
    })
    .catch(console.log);
};

export const axiosAddUserToCompany = (userId, companyDispatch) => {
  axios
  .post(`${API_URL}/user/${userId}/addCompany`,{
    company_id: localStorage.getItem('currentCompany')
  }, authHeader())
  .then((resp) => {
    axiosFetchCurrentCompany(companyDispatch)
    console.log(resp)
  })
  .catch(console.log)
}

export const axiosCreateUser = (user, companyDispatch) => {
  axios
    .post(`${API_URL}/auth/register`, user)
    .then(function (response) {
      console.log(response)
      axiosAddUserToCompany(response.data.user._id, companyDispatch)
    })
    .catch(console.log);
};

export const axiosFetchUser = (dispatch) => {
  axios
    .get(`${API_URL}/auth/checkToken`, authHeader())
    .then((resp) => {
      dispatch({
        type: 'setUser',
        payload: resp.data.user,
      });
    })
    .catch(console.log);
};

export const axiosGetAllUsers = (dispatch) => {
  axios
    .get(`${API_URL}/user/all`, authHeader())
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: 'fetchAllUsers',
        payload: response.data,
      });
    })
    .catch(console.log);
};
