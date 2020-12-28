import axios from 'axios'

export const axiosLoginUser = (user, dispatch) => {
  axios
    .post('http://localhost:3010/auth/login', {
      email: user.email,
      password: user.password,
      remember: user.rememberMe
    })
    .then(function (response) {
      //console.log(response);
      // TODO: Store token locally. Need to do some reaserch into where this should be stored.
      localStorage.setItem('token', JSON.stringify(response.data.token));
      console.log(localStorage.getItem('token'))

      dispatch({
        type: "setUser",
        payload: response.data.user
      })
      
    })
    .catch(function (error) {
      console.log(error);
      // TODO: Handle your errors appropriately. Use the error statuses to display different errors
      // if (error.status === 404) {
      //   setError(`It's broken go somewhere else`);
      // }
    });
}