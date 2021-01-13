import React, { useReducer, createContext } from 'react'
import { defaultStateShape, usersReducer } from './reducer'
import {
  axiosUpdateTokenUser
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getUsers: () => {},
  updateUser: () => {}
  
})

const UsersProvider = ({children}) => {
  const [state, dispatch] = useReducer(usersReducer, defaultStateShape)
  const updateUser = (values, companyDispatch) => {axiosUpdateTokenUser(values, companyDispatch)}
  return (
    <Context.Provider value={{ state, dispatch, updateUser }}>
      { children }
    </Context.Provider>
  )
}

export { Context as UsersContext }
export default UsersProvider