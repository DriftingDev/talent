import React, { useReducer, createContext } from 'react';
import { defaultStateShape, userReducer } from './reducer';
import {
  axiosLoginUser,
  axiosRegisterUser,
  axiosFetchUser,
  axiosCreateUser,
  axiosGetAllUsers,
} from './actions';

const Context = createContext({
  state: defaultStateShape,
  dispatch: () => {},
  loginUser: () => {},
  registerUser: () => {},
  fetchUser: () => {},
  createUser: () => {},
  getAllUsers: () => {},
});

const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, defaultStateShape);
  const loginUser = (values) => axiosLoginUser(values, dispatch);
  const registerUser = (values) => axiosRegisterUser(values, dispatch);
  const fetchUser = () => axiosFetchUser(dispatch);
  const createUser = (values, companyDispatch) => axiosCreateUser(values, companyDispatch);
  const getAllUsers = () => axiosGetAllUsers(dispatch);
  return (
    <Context.Provider
      value={{
        state,
        dispatch,
        loginUser,
        registerUser,
        fetchUser,
        createUser,
        getAllUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context as CurrentUserContext };
export default CurrentUserProvider;
