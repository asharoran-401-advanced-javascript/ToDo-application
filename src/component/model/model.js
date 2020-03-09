// eslint-disable-next-line strict
'use strict';
/* eslint-disable no-unused-vars */
import React from 'react';
//---- use this model to control show/hide thhe details of the item -----//

const Model = (props) => {
  return(
    <section>
      <div className="details">
        <header className="details-title">
          <span className="title">{props.title}</span>
          <button onClick={props.close}>[X]</button>
        </header>
        <div className="details-info">{props.children}</div>
      </div>
    </section>
  );
};

export default Model;