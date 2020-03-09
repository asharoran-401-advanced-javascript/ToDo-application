// // eslint-disable-next-line strict
// eslint-disable-next-line strict
'use strict';
import React from 'react';

const render = (condition = false , childern = null) => {
  return condition ? childern : null;
};


export const If = (props) => { // If component  pas it as function
  return React.Children.map(props.children , child => { // big Children is an arr ,I need to looping through on it have (props.children- arr too --) as element and childe as index
    return React.cloneElement(child , { condition: props.condition}); // clone the element have two proprety (child -- index) and object that have condition
  });
};

// //================= I can use Then/Else or When/Unless ========================//

export const Then = (props) => render(props.condition, props.children);
export const Else = (props) => render(!props.condition, props.children);


export const When = (props) => render(props.condition, props.children);
export const Unless = (props) => render(!props.condition, props.children);