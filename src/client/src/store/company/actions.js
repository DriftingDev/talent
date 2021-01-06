import axios from 'axios';

let token;
const authHeader = () => {
  let returnVal = null
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token'));
    returnVal = { headers: { Authorization: 'Bearer ' + token } };
  }
  return returnVal
};


export const axiosCreateCompany = (user, dispatch) => {
  console.log('in the create company axios call');
  // console.log(user.company);
  axios
    .post(
      'http://localhost:3010/company/new',
      {
        name: user.company,
      },
      authHeader()
    )
    .then(function (response) {
      // console.log(response.data);
      // localStorage.setItem('token', JSON.stringify(response.data.token));

      dispatch({
        type: 'clearCompanies',
      });
    })
    .catch(function (error) {
      console.log(`ARGGGGGGH ${error}`);
    });
};

export const axiosGetAllCompanies = (dispatch) => {
  console.log('in the axiosGetAllCompanies call');
  axios
    .get('http://localhost:3010/company/userCompanies', authHeader())
    .then(function (response) {
      // handle success
      console.log(response.data);
      dispatch({
        type: 'setCompanies',
        payload: response.data.companies,
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

export const axiosUpdateCompany = (updatedCompany, dispatch, company) => {
  console.log('in the axiosUpdateCompany call');
  // console.log(company._id);
  // console.log(company);
  axios
    .post(
      `http://localhost:3010/company/${company._id}`,
      {
        name: updatedCompany.company,
      },
      authHeader()
    )
    .then(function (response) {
      // handle success
      dispatch({
        type: 'clearCompanies',
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

export const axiosDeleteCompany = (dispatch, company_id) => {
  console.log('in the axiosDeleteCompany call');
  console.log(company_id);
  axios
    .delete(`http://localhost:3010/company/${company_id}`, authHeader())
    .then(function (response) {
      // handle success
      axiosGetAllCompanies(dispatch)
    })
    .catch(console.log)
};

export const axiosFetchCurrentCompany = (dispatch) => {
  axios
    .get(`http://localhost:3010/company/${localStorage.getItem('currentCompany')}`, authHeader())
    .then(function (response) {
      // handle success
      dispatch({
        type: 'setCurrentCompany',
        payload: response.data.company,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}
