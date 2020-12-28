import React, { useReducer, createContext } from 'react'
import { defaultStateShape, userReducer } from './reducer'
import {
  axiosLoginUser
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  loginUser: () => {}
})

const CurrentUserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, defaultStateShape)
  const loginUser = (values) => axiosLoginUser(values, dispatch)
  return (
    <Context.Provider value={{ state, dispatch, loginUser }}>
      { children }
    </Context.Provider>
  )
}

export { Context as CurrentUserContext }
export default CurrentUserProvider