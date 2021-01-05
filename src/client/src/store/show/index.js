import React, { useReducer, createContext } from 'react'
import { defaultStateShape, showReducer } from './reducer'
import {
  axiosGetShows,
  axiosGetShowsByUser,
  axiosBatchCreateShows,
  axiosUpdateShow,
  axiosDeleteShow
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getShows: () => {},
  getShowsByUser: () => {},
  createShows: () => {},
  updateShow: () => {},
  deleteShow: () => {}
})

const ShowProvider = ({children}) => {
  const [state, dispatch] = useReducer(showReducer, defaultStateShape)
  const getShows = () => { axiosGetShows(dispatch) }
  const getShowsByUser = (id) => {axiosGetShowsByUser(dispatch,id)}
  const createShows = (shows, currentCompany) => {axiosBatchCreateShows(dispatch, shows, currentCompany)}
  const updateShow = (showVals, currentCompany) => {axiosUpdateShow(dispatch, showVals, currentCompany)}
  const deleteShow = (showId) => {axiosDeleteShow(dispatch, showId)}
  return (
    <Context.Provider value={{ state, dispatch, getShows, getShowsByUser, createShows, updateShow, deleteShow }}>
      { children }
    </Context.Provider>
  )
}

export { Context as ShowContext }
export default ShowProvider