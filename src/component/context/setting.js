/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import  { useState } from 'react';
import cookie from 'react-cookies';

export const SettingsContext = React.createContext(); // make a global function
const SettingProvider = (props) => {
  const qs = new URLSearchParams(window.location.search); // constratur to create and render url search params as object
  const cookieToken = cookie.load('auth');
  const token = qs.get('token') || cookieToken || null;

  const [displayCompleted , setDisplayCompleted] = useState(true);
  const [countItem , setCountItem] = useState(5);
  const [userToken , setUserToken] = useState(token);
  const [login , setLogin] = useState(false);
  const [logout , setLogout] = useState(true);
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');

  const state = { // pass all the state proprety and set proprwty in my state
    displayCompleted,
    countItem,
    userToken,
    login,
    logout,
    username,
    password,
    setDisplayCompleted,
    setCountItem,
    setUserToken,
    setLogin,
    setLogout,
    setUsername,
    setPassword,
  };

  return(
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingProvider;