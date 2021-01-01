import React, { useReducer, createContext } from 'react';
import { defaultStateShape, companyReducer } from './reducer';
import { axiosCreateCompany, axiosGetAllCompanies } from './actions';

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  createCompany: () => {},
  getAllCompanies: () => {},
});

const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, defaultStateShape);
  const createCompany = (values) => axiosCreateCompany(values, dispatch);
  const getAllCompanies = () => axiosGetAllCompanies(dispatch);
  return (
    <Context.Provider
      value={{ state, dispatch, createCompany, getAllCompanies }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as CompanyContext };
export default CompanyProvider;
