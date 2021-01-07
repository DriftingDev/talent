import React, { useReducer, createContext } from 'react'
import { defaultStateShape, usersReducer } from './reducer'
import {
  axiosGetUsers,
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
  const getUsers = () => {axiosGetUsers(dispatch)}
  const updateUser = (values, companyDispatch) => {axiosUpdateTokenUser(values, companyDispatch)}
  return (
    <Context.Provider value={{ state, dispatch, getUsers, updateUser }}>
      { children }
    </Context.Provider>
  )
}

export { Context as UsersContext }
export default UsersProvider