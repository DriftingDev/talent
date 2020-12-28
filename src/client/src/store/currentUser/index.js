import React, { useReducer, createContext } from 'react'
import { defaultStateShape, userReducer } from './reducer'
import {
  
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  
})

const CurrentUserProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, defaultStateShape)
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  )
}

export { Context as CurrentUserContext }
export default CurrentUserProvider