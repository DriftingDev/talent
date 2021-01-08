let API_URL;

process.env.NODE_ENV === 'production' ?
API_URL = "https://salty-bayou-37372.herokuapp.com"
:
API_URL = "http://localhost:3010"

export default API_URL