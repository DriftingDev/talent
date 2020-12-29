import React, { useReducer, createContext } from 'react'
import { defaultStateShape, userReducer } from './reducer'
import { axiosLoginUser, axiosRegisterUser, axiosFetchUser } from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  loginUser: () => {},
  registerUser: () => {},
  fetchUser: () => {}
})

const CurrentUserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, defaultStateShape)
  const loginUser = (values) => axiosLoginUser(values, dispatch)
  const registerUser = (values) => axiosRegisterUser(values, dispatch)
  const fetchUser = () => axiosFetchUser(dispatch)
  return (
    <Context.Provider value={{ state, dispatch, loginUser, registerUser, fetchUser }}>
      { children }
    </Context.Provider>
  )
}

export { Context as CurrentUserContext }
export default CurrentUserProvider