import React, { useReducer, createContext } from 'react'
import { defaultStateShape, showReducer } from './reducer'
import {
  axiosGetShows
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getShows: () => {}
})

const ShowProvider = ({children}) => {
  const [state, dispatch] = useReducer(showReducer, defaultStateShape)
  const getShows = () => { axiosGetShows(dispatch) }
  return (
    <Context.Provider value={{ state, dispatch, getShows }}>
      { children }
    </Context.Provider>
  )
}

export { Context as ShowContext }
export default ShowProvider