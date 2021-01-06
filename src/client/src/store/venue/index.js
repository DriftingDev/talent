import React, { useReducer, createContext } from 'react'
import { defaultStateShape, venueReducer } from './reducer'
import {
  axiosVenuesByUser,
  axiosVenuesByCompany,
  axiosDeleteVenue,
  axiosUpdateVenue,
  axiosCreateVenues
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  getVenuesByCompany: () => {},
  getVenuesByUser: () => {},
  deleteVenue: () => {},
  updateVenue: () => {},
  createVenues: () => {}
})

const VenueProvider = ({children}) => {
  const [state, dispatch] = useReducer(venueReducer, defaultStateShape)
  const getVenuesByCompany = () => {axiosVenuesByCompany(dispatch)}
  const getVenuesByUser = () => {axiosVenuesByUser(dispatch)}
  const deleteVenue = (venue) => {axiosDeleteVenue(dispatch, venue)}
  const updateVenue = (values, venue) => {axiosUpdateVenue(dispatch, values, venue)}
  const createVenues = (values) => {axiosCreateVenues(dispatch, values)}
  return (
    <Context.Provider value={{ state, dispatch, getVenuesByCompany, getVenuesByUser, deleteVenue, updateVenue, createVenues }}>
      { children }
    </Context.Provider>
  )
}

export { Context as VenueContext }
export default VenueProvider