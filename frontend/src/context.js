import React, { createContext } from 'react';

export const initialValues = {
  token: localStorage.getItem('token')
}

export const Context = createContext(initialValues);
export const useContext = React.useContext;
