import React, { useReducer, createContext } from 'react'
import { defaultStateShape, userReducer } from './reducer'
import { axiosLoginUser, axiosRegisterUser } from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  loginUser: () => {},
  registerUser: () => {}
})

const CurrentUserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, defaultStateShape)
  const loginUser = (values) => axiosLoginUser(values, dispatch)
  const registerUser = (values) => axiosRegisterUser(values, dispatch)
  return (
    <Context.Provider value={{ state, dispatch, loginUser, registerUser }}>
      { children }
    </Context.Provider>
  )
}

export { Context as CurrentUserContext }
export default CurrentUserProvider