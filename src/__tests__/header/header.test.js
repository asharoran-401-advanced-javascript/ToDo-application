/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '../../component/header/header.js';

describe( '<Header />' , () => {
  it('header is exist at start application' , () =>{
    let app = shallow(<Header />);
    expect(app.find('h1').exists).toBeTruthy();
  });
  //renderer is a package that’s able to take a React component and render it as a pure JavaScript object.
  it('render correctly' , () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});