/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Main from '../../component/mainToDo/main.js';

describe( '<Main />' , () => {
  it('Main should exist at Todo application' , () =>{
    let app = shallow(<Main />);
    expect(app.find('.todo').exists).toBeTruthy();
    expect(app.find('.difficulty').exists).toBeTruthy();
    expect(app.find('.form-button').exists).toBeTruthy();
    expect(app.find('.item').exists).toBeTruthy();
    expect(app.find('.todo-details').exists).toBeTruthy();
  });

  //   it('Main should contain the todo form and todo list and item details' ,() => {
  //     let app = mount(<Main />);
  //     let todo = app.find('.todo');
  //     let difficulty = app.find('.difficulty');
  //     let formButton = app.find('.form-button');
  //     let item = app.find('.item');
  //     let details = app.find('.todo-details');
  //   });
  //renderer is a package that’s able to take a React component and render it as a pure JavaScript object.
  it('render correctly' , () => {
    const tree = renderer.create(<Main />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});