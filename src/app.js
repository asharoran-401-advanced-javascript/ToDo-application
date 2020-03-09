/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import Main from './component/mainToDo/main.js';
import SettingsProvider from './context/settings.js';

const App = ()=>{
  return(
    <>
      <SettingsProvider>
        <Header/>
        <Main/>
        <Footer/>
      </SettingsProvider>
    </>
  );
};

export default App;