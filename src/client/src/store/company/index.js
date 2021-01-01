import React, { useReducer, createContext } from 'react';
import { defaultStateShape, companyReducer } from './reducer';
import { axiosCreateCompany } from './actions';

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  createCompany: () => {},
});

const CompanyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, defaultStateShape);
  const createCompany = (values) => axiosCreateCompany(values, dispatch);
  return (
    <Context.Provider value={{ state, dispatch, createCompany }}>
      {children}
    </Context.Provider>
  );
};

export { Context as CompanyContext };
export default CompanyProvider;
