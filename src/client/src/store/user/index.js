import React, { useReducer, createContext } from 'react'
import { defaultStateShape, usersReducer } from './reducer'
import {
  axiosGetUsers
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getUsers: () => {}
  
})

const UsersProvider = ({children}) => {
  const [state, dispatch] = useReducer(usersReducer, defaultStateShape)
  const getUsers = () => {axiosGetUsers(dispatch)}
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  )
}

export { Context as UsersContext }
export default UsersProvider