import axios from 'axios'
import {API_URL, authHeader } from '../actionUtils'

export const axiosGetShows = (dispatch) => {
  axios
    .get(`${API_URL}/show/showsByCompany/${localStorage.getItem('currentCompany')}`,  authHeader())
    .then((resp) => {
      dispatch({
        type: 'setShows',
        payload: resp.data.shows
      })
    })
    .catch(console.log);
}

export const axiosGetShowsByUser = (dispatch, id) => {
  axios
    .get(`${API_URL}/show/showsByUser/${id}`,  authHeader())
    .then((resp) => {
      dispatch({
        type: 'setShows',
        payload: resp.data.shows
      })
    })
    .catch(console.log);
}

export const axiosBatchCreateShows = async (dispatch, showsObject, currentCompany) => {
  let userArray = currentCompany.users.filter((user) => {
    let found = false
    showsObject.artists.forEach((artist) => {
      if (artist === user.accname) {
        found = true
      }
    })
    return found
  }).map(artist => artist._id)

  showsObject.venue =  currentCompany.venues.filter(venue => venue.name === showsObject.venue)[0]._id
  showsObject.shows.map((showEndStartObj, index, arr) => {
    const data = {
      company: currentCompany._id,
      artists: userArray,
      venue: showsObject.venue,
      showName: showsObject.showName,
      descrip: showsObject.descrip,
      eventStart: showEndStartObj.eventStartDate,
      eventEnd: showEndStartObj.eventEndDate
    }
    return axios
            .post(`${API_URL}/show/new`, data, authHeader())
            .then((resp) => {
              if (index + 1 === arr.length){
                axiosGetShows(dispatch)
              }
            })
            .catch(console.log)
  })
}

export const axiosUpdateShow = (dispatch, showsObject, currentCompany) => {
  let userArray = currentCompany.users.filter((user) => {
    let found = false
    showsObject.artists.forEach((artist) => {
      if (artist === user.accname) {
        found = true
      }
    })
    return found
  }).map(artist => artist._id)
  showsObject.venue =  currentCompany.venues.filter(venue => venue.name === showsObject.venue)[0]._id
  const data = {
    artists: userArray,
    venue: showsObject.venue,
    showName: showsObject.showName,
    descrip: showsObject.descrip,
    eventStart: showsObject.eventStart,
    eventEnd: showsObject.eventEnd
  }
  axios
    .post(`${API_URL}/show/${showsObject._id}`, data, authHeader())
    .then((resp) => {
      console.log(resp)
      axiosGetShows(dispatch)
    })
    .catch(console.log)
}

export const axiosDeleteShow = (dispatch, id) => {
  axios
    .delete(`${API_URL}/show/${id}`, authHeader())
    .then((resp) => {
      axiosGetShows(dispatch)
    })
    .catch(console.log)
} 
