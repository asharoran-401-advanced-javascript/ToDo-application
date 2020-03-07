// eslint-disable-next-line strict
'use strict';

import React, { useState } from 'react';

export const SettingsContext = React.createContext(); // make a global function

const SettingProvider = (props) => {
  const [displayCompleted , setDisplayCompleted] = useState(true);
  const [countItem , setCountItem] = useState(5);
  const state = {
    displayCompleted,
    countItem,
    changeDisplay: setDisplayCompleted,
    changeVount :setCountItem,

  };

  return(
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingProvider;