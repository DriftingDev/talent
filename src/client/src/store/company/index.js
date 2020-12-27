import React, { useReducer, createContext } from 'react'
import { defaultStateShape, companyReducer } from './reducer'
import {
  
} from "./actions"

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  
})

const CompanyProvider = ({children}) => {
  const [state, dispatch] = useReducer(companyReducer, defaultStateShape)
  return (
    <Context.Provider value={{ state, dispatch }}>
      { children }
    </Context.Provider>
  )
}

export { Context as CompanyContext }
export default CompanyProvider