import axios from 'axios'
import moment from 'moment'

let token;
const authHeader = () => {
  let returnVal = null
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token'));
    returnVal = { headers: { Authorization: 'Bearer ' + token } };
  }
  return returnVal
};

export const axiosGetShows = (dispatch) => {
  axios
    .get(`http://localhost:3010/show/showsByCompany/${localStorage.getItem('currentCompany')}`,  authHeader())
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
    .get(`http://localhost:3010/show/showsByUser/${id}`,  authHeader())
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

export const axiosBatchCreateShows = async (dispatch, showsObject, currentCompany) => {
  console.log(currentCompany.users, currentCompany.venues)
  console.log(showsObject)
  showsObject.artist = currentCompany.users.filter(user => user.accname === showsObject.artist)[0]._id
  showsObject.venue =  currentCompany.venues.filter(venue => venue.name === showsObject.venue)[0]._id
  showsObject.shows.map((showEndStartObj, index, arr) => {
    const data = {
      company: currentCompany._id,
      artists: showsObject.artist,
      venue: showsObject.venue,
      showName: showsObject.showName,
      descrip: showsObject.descrip,
      eventStart: showEndStartObj.eventStartDate,
      eventEnd: showEndStartObj.eventEndDate
    }
    return axios
            .post("http://localhost:3010/show/new", data, authHeader())
            .then((resp) => {
              if (index + 1 === arr.length){
                axiosGetShows(dispatch)
              }
            })
            .catch((err) =>{
              console.log(err)
            })
  })
}

