import React, { useReducer, createContext } from 'react'
import { defaultStateShape, usersReducer } from './reducer'
import {
  
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  
})

const UsersProvider = ({children}) => {
  const [state, dispatch] = useReducer(usersReducer, defaultStateShape)
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  )
}

export { Context as UsersContext }
export default UsersProvider