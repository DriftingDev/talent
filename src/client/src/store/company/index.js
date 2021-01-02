import React, { useReducer, createContext } from 'react';
import { defaultStateShape, companyReducer } from './reducer';
import {
  axiosCreateCompany,
  axiosGetAllCompanies,
  axiosUpdateCompany,
} from './actions';

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  createCompany: () => {},
  getAllCompanies: () => {},
  axiosUpdateCompany: () => {},
});

const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, defaultStateShape);
  const createCompany = (values) => axiosCreateCompany(values, dispatch);
  const getAllCompanies = () => axiosGetAllCompanies(dispatch);
  const updateCompany = (values, company) => axiosUpdateCompany(values, dispatch, company);
  return (
    <Context.Provider
      value={{ state, dispatch, createCompany, getAllCompanies, updateCompany }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as CompanyContext };
export default CompanyProvider;
