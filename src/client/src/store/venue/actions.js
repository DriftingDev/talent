import axios from 'axios'

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
  .get('http://localhost:3010/venue/venuesByUser', authHeader())
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
  .get(`http://localhost:3010/venue/venuesByCompany/${localStorage.getItem('currentCompany')}`, authHeader())
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
  .delete(`http://localhost:3010/venue/${venue_id}`, authHeader())
  .then((resp) => {
    axiosVenuesByCompany(dispatch)
  })
  .catch(console.log)
}

export const axiosUpdateVenue = (dispatch, values, venue) => {
  axios
  .post(`http://localhost:3010/venue/${venue._id}`, values, authHeader())
  .then((resp) => {
    axiosVenuesByCompany(dispatch)
  })
  .catch(console.log)
}

export const axiosCreateVenues = (dispatch, values) => {
  values.venues.forEach((venue, index, arr) => {
    axios
    .post('http://localhost:3010/venue/new', venue, authHeader())
    .then((resp) => {
      if(index + 1 === arr.length) {
        axiosVenuesByCompany(dispatch)
      }
    })
    .catch(console.log)
  })
}