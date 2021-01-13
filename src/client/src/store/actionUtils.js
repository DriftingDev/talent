let API_URL;

process.env.NODE_ENV === 'production' ?
API_URL = "https://salty-bayou-37372.herokuapp.com"
:
API_URL = "http://localhost:3010"

let token;
const authHeader = () => {
  let returnVal = null
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token'));
    returnVal = { headers: { Authorization: 'Bearer ' + token } };
  }
  return returnVal
};

export {
  API_URL,
  authHeader
} 