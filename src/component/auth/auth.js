/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

// https://auth0.com/blog/handling-authentication-in-react-with-context-and-hooks/

import React , { useContext } from 'react';
import {SettingsContext} from '../../context/settings.js';
import jwt from 'jsonwebtoken';
import {If , Then , When , Else} from '../if/if.js';

const Auth = (props) => {
  const context = useContext(SettingsContext); // beacuse we use a function here so we need to use (useContext)
  let okToRender = false;
  let user = {}; //pass it as object

  try{
    user = context.userToken
      ? jwt.verify(context.userToken , process.env.React_APP_SECRET)
      : {};
    okToRender = context.login && (props.capability ? user.capabilities.includes(props.capability) : true);
  }
  catch(e){
    console.warn(e);
  }

  return(
    <If condition={okToRender}>
      <Then>
        <div>{props.children}</div>
      </Then>

    </If>
  );
};

export default Auth;