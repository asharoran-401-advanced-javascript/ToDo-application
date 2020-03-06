/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Footer from '../../component/footer/footer.js';

describe( '<Footer />' , () => {
  it('Footer is exist as end Todo Application' , () => {
    let app = shallow(<Footer />);
    expect(app.find('footer').exists).toBeTruthy();
  });
  //renderer is a package that’s able to take a React component and render it as a pure JavaScript object.
  it('render correctly' , () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});