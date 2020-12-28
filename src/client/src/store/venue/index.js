import React, { useReducer, createContext } from 'react'
import { defaultStateShape, venueReducer } from './reducer'
import {
  
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  
})

const VenueProvider = ({children}) => {
  const [state, dispatch] = useReducer(venueReducer, defaultStateShape)
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  )
}

export { Context as VenueContext }
export default VenueProvider