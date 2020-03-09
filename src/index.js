/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';

function Entry(){
  return(
    <>
      <App/>
    </>
  );
}

let rootElement = document.getElementById('root');
ReactDOM.render(<Entry/> , rootElement);