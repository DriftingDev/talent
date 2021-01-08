import axios from 'axios'
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

export const axiosVenuesByUser = (dispatch) => {
  axios
  .get(`${API_URL}/venue/venuesByUser`, authHeader())
  .then((resp) => {
    dispatch({
      type: 'setVenues',
      payload: resp.data.venues
    })
  })
  .catch(console.log)
}

export const axiosVenuesByCompany = (dispatch) => {
  axios
  .get(`${API_URL}/venue/venuesByCompany/${localStorage.getItem('currentCompany')}`, authHeader())
  .then((resp) => {
    dispatch({
      type: 'setVenues',
      payload: resp.data.venues
    })
  })
  .catch(console.log)
}

export const axiosDeleteVenue = (dispatch, venue_id) => {
  axios
  .delete(`${API_URL}/venue/${venue_id}`, authHeader())
  .then((resp) => {
    axiosVenuesByCompany(dispatch)
  })
  .catch(console.log)
}

export const axiosUpdateVenue = (dispatch, values, venue) => {
  axios
  .post(`${API_URL}/venue/${venue._id}`, values, authHeader())
  .then((resp) => {
    axiosVenuesByCompany(dispatch)
  })
  .catch(console.log)
}

export const axiosCreateVenues = (dispatch, values) => {
  values.venues.forEach((venue, index, arr) => {
    axios
    .post(`${API_URL}/venue/new`, venue, authHeader())
    .then((resp) => {
      if(index + 1 === arr.length) {
        axiosVenuesByCompany(dispatch)
      }
    })
    .catch(console.log)
  })
}