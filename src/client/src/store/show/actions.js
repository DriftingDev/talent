import axios from 'axios'

let token;
let authHeader;

if (localStorage.getItem('token')) {
  token = JSON.parse(localStorage.getItem('token'))
  authHeader = { headers: {"Authorization" : "Bearer " + token} } 
}

export const axiosGetShows = (dispatch) => {
  //hardcoded for now, get from localStorage later
  axios
    .get('http://localhost:3010/show/showsByCompany/5fe2b362a255ba5248281eab',  authHeader)
    .then((resp) => {
      dispatch({
        type: 'setShows',
        payload: resp.data.shows
      })
    })
    .catch((error) => {
      console.log(error);
    });
}

