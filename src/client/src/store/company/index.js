import React, { useReducer, createContext } from 'react';
import { defaultStateShape, companyReducer } from './reducer';
import {
  axiosCreateCompany,
  axiosGetAllCompanies,
  axiosUpdateCompany,
  axiosDeleteCompany,
  axiosFetchCurrentCompany
} from './actions';

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  createCompany: () => {},
  getAllCompanies: () => {},
  /// THESE NEED TO CHANGE
  axiosUpdateCompany: () => {},
  axiosDeleteCompany: () => {},
  fetchCurrentCompany: () => {}
});

const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, defaultStateShape);
  const createCompany = (values) => axiosCreateCompany(values, dispatch);
  const getAllCompanies = () => axiosGetAllCompanies(dispatch);
  const updateCompany = (values, company) => axiosUpdateCompany(values, dispatch, company);
  const deleteCompany = (company) => axiosDeleteCompany(dispatch, company);
  const fetchCurrentCompany = () => axiosFetchCurrentCompany(dispatch)
  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        createCompany,
        getAllCompanies,
        updateCompany,
        deleteCompany,
        fetchCurrentCompany
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as CompanyContext };
export default CompanyProvider;
