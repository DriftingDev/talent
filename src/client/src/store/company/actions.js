import axios from 'axios';

let token;
let authHeader;

if (localStorage.getItem('token')) {
  token = JSON.parse(localStorage.getItem('token'))
  authHeader = { headers: {"Authorization" : "Bearer " + token} }
}

export const axiosCreateCompany = (user, dispatch) => {
  console.log('in the create company thing');
  console.log(user.company)
  axios
    .post('http://localhost:3010/company/new', {
      name: user.company,
    }, authHeader)
    .then(function (response) {
      console.log(response.data)
      // localStorage.setItem('token', JSON.stringify(response.data.token));

      dispatch({
        type: 'setCompanies',
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(`ARGGGGGGH ${error}`);
    });
};

