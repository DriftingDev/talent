import axios from 'axios';
import { axiosFetchCurrentCompany } from '../company/actions';
import API_URL from '../actionUtils'

let token;
const authHeader = () => {
  let returnVal = null
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token'));
    returnVal = { headers: { Authorization: 'Bearer ' + token } };
  }
  return returnVal
};

export const axiosGetUsers = (dispatch) => {
  // axios
  // .get()
}

export const axiosUpdateTokenUser = (values, companyDispatch) => {
  axios
  .post(`${API_URL}/user/edit`, values, authHeader())
  .then((resp) => {
    console.log(resp)
    axiosFetchCurrentCompany(companyDispatch)
  })
  .catch(console.log)
}