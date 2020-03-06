// eslint-disable-next-line strict
'use strict';

import { useEffect, useState } from 'react';

//------------------ I fellow this webside ----------------------//

//https://scotch.io/tutorials/create-a-custom-usefetch-react-hook

const useFetch = (props) => {
  const [response , setResponse] = useState({});
  const [ error , setError] = useState(null);
  const [ isLoading , setIsLoading] = useState(false);
  const [ request , setRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if(!request) return ; // if there is no req return nothing
      setIsLoading(true);

      try { // fech the url and convert it to json object and set this response
        request.options.header = { 'Content-Type' : 'application/json'};
        let res = await fetch(request.url , request.options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      }
      catch(error) { //catch call error and set this state
        setError(error);
      }
    };
    fetchData(); //call the fech function tp avoid retuning implicit Promise
  } , [request]);

  return [setRequest , response , error , isLoading];
};

export default useFetch;