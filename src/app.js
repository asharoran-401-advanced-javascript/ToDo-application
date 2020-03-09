/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import Header from './component/header/header.js';
import Footer from './component/footer/footer.js';
import Main from './component/mainToDo/main.js';

const App = ()=>{
  return(
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  );
};

export default App;