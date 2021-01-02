import React, { useReducer, createContext } from 'react'
import { defaultStateShape, showReducer } from './reducer'
import {
  axiosGetShows,
  axiosGetShowsByUser
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getShows: () => {},
  getShowsByUser: () => {}
})

const ShowProvider = ({children}) => {
  const [state, dispatch] = useReducer(showReducer, defaultStateShape)
  const getShows = () => { axiosGetShows(dispatch) }
  const getShowsByUser = (id) => {axiosGetShowsByUser(dispatch,id)}
  return (
    <Context.Provider value={{ state, dispatch, getShows, getShowsByUser }}>
      { children }
    </Context.Provider>
  )
}

export { Context as ShowContext }
export default ShowProvider