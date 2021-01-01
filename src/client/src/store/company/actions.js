import axios from 'axios';

let token;
let authHeader;

if (localStorage.getItem('token')) {
  token = JSON.parse(localStorage.getItem('token'));
  authHeader = { headers: { Authorization: 'Bearer ' + token } };
}

export const axiosCreateCompany = (user, dispatch) => {
  console.log('in the create company axios call');
  // console.log(user.company);
  axios
    .post(
      'http://localhost:3010/company/new',
      {
        name: user.company,
      },
      authHeader
    )
    .then(function (response) {
      // console.log(response.data);
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

export const axiosGetAllCompanies = (dispatch) => {
  axios
    .get('http://localhost:3010/company/userCompanies', authHeader)
    .then(function (response) {
      // handle success
      console.log(response.data);
      dispatch({
        type: 'setCompanies',
        payload: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};
