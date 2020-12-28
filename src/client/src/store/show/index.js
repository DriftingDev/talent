import React, { useReducer, createContext } from 'react'
import { defaultStateShape, showReducer } from './reducer'
import {
  
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  
})

const ShowProvider = ({children}) => {
  const [state, dispatch] = useReducer(showReducer, defaultStateShape)
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  )
}

export { Context as ShowContext }
export default ShowProvider