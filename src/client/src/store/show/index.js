import React, { useReducer, createContext } from 'react'
import { defaultStateShape, showReducer } from './reducer'
import {
  axiosGetShows,
  axiosGetShowsByUser,
  axiosBatchCreateShows
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getShows: () => {},
  getShowsByUser: () => {},
  createShows: () => {}
})

const ShowProvider = ({children}) => {
  const [state, dispatch] = useReducer(showReducer, defaultStateShape)
  const getShows = () => { axiosGetShows(dispatch) }
  const getShowsByUser = (id) => {axiosGetShowsByUser(dispatch,id)}
  const createShows = (shows, currentCompany) => {axiosBatchCreateShows(dispatch, shows, currentCompany)}
  return (
    <Context.Provider value={{ state, dispatch, getShows, getShowsByUser, createShows }}>
      { children }
    </Context.Provider>
  )
}

export { Context as ShowContext }
export default ShowProvider