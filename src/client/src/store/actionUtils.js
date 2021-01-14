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

function randomColor(){
  var color = "#";
  var randomHex = "0123456789ABCDEF";  
  for(var i = 0; i<6;i++){
      color+= randomHex[Math.floor(Math.random()*16)]
  }
 
  return color;
}

export {
  API_URL,
  authHeader,
  randomColor
} 