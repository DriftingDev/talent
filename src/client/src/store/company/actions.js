import axios from 'axios';
import {API_URL, authHeader } from '../actionUtils'

export const axiosCreateCompany = (user, dispatch) => {
  console.log('in the create company axios call');
  axios
    .post(
      `${API_URL}/company/new`,
      {
        name: user.company,
      },
      authHeader()
    )
    .then(function (response) {
      dispatch({
        type: 'clearCompanies',
      });
    })
    .catch(console.log);
};

export const axiosGetAllCompanies = (dispatch) => {
  console.log('in the axiosGetAllCompanies call');
  axios
    .get(`${API_URL}/company/userCompanies`, authHeader())
    .then(function (response) {
      dispatch({
        type: 'setCompanies',
        payload: response.data.companies,
      });
    })
    .catch(console.log)
};

export const axiosUpdateCompany = (updatedCompany, dispatch, company) => {
  axios
    .post(
      `${API_URL}/company/${company._id}`,
      {
        name: updatedCompany.company,
      },
      authHeader()
    )
    .then(function (response) {
      dispatch({
        type: 'clearCompanies',
      });
    })
    .catch(console.log)
};

export const axiosDeleteCompany = (dispatch, company_id) => {
  axios
    .delete(`${API_URL}/company/${company_id}`, authHeader())
    .then(function (response) {
      axiosGetAllCompanies(dispatch)
    })
    .catch(console.log)
};

export const axiosFetchCurrentCompany = (dispatch) => {
  axios
    .get(`${API_URL}/company/${localStorage.getItem('currentCompany')}`, authHeader())
    .then(function (response) {
      dispatch({
        type: 'setCurrentCompany',
        payload: response.data.company,
      });
    })
    .catch(console.log)
}
