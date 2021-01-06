import React, { useReducer, createContext } from 'react'
import { defaultStateShape, venueReducer } from './reducer'
import {
  axiosVenuesByUser,
  axiosVenuesByCompany,
  axiosDeleteVenue,
  axiosUpdateVenue
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getVenuesByCompany: () => {},
  getVenuesByUser: () => {},
  deleteVenue: () => {},
  updateVenue: () => {}
})

const VenueProvider = ({children}) => {
  const [state, dispatch] = useReducer(venueReducer, defaultStateShape)
  const getVenuesByCompany = () => {axiosVenuesByCompany(dispatch)}
  const getVenuesByUser = () => {axiosVenuesByUser(dispatch)}
  const deleteVenue = (venue) => {axiosDeleteVenue(dispatch, venue)}
  const updateVenue = (values, venue) => {axiosUpdateVenue(dispatch, values, venue)}
  return (
    <Context.Provider value={{ state, dispatch, getVenuesByCompany, getVenuesByUser, deleteVenue, updateVenue }}>
      { children }
    </Context.Provider>
  )
}

export { Context as VenueContext }
export default VenueProvider