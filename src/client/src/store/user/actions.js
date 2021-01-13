import axios from 'axios';
import { axiosFetchCurrentCompany } from '../company/actions';
import {API_URL, authHeader } from '../actionUtils'

export const axiosUpdateTokenUser = (values, companyDispatch) => {
  axios
  .post(`${API_URL}/user/edit`, values, authHeader())
  .then((resp) => {
    console.log(resp)
    axiosFetchCurrentCompany(companyDispatch)
  })
  .catch(console.log)
}