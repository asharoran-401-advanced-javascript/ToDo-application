// eslint-disable-next-line strict
'use strict';

//---------------------------Coustem Hooks to update the form ------------------------//

import { useState } from 'react';

const useForm = (cb) =>{ // pass a call back function as a parameter
  const [values , setValues] = useState({});

  // method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur
  const handleSubmit = (e) => {
    if (e) {
      return e.preventDefault();}
    console.log('----- values(): -----',values);
    cb(values);  // then call the values on each submit
  };

  const handleChange = (e) => {
    e.persist(); // store and save (database mechanism)
    setValues(values => ({...values , [e.target.name] : e.target.value}));
  };

  return [handleSubmit , handleChange , values];
};

export default useForm;