import axios from 'axios'

let token;
let authHeader;

if (localStorage.getItem('token')) {
  token = JSON.parse(localStorage.getItem('token'))
  authHeader = { headers: {"Authorization" : "Bearer " + token} } 
}

export const axiosGetShows = (dispatch) => {
  axios
    .get(`http://localhost:3010/show/showsByCompany/${localStorage.getItem('currentCompany')}`,  authHeader)
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

export const axiosGetShowsByUser = (dispatch, id) => {
  axios
    .get(`http://localhost:3010/show/showsByUser/${id}`,  authHeader)
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

