
// eslint-disable-next-line strict
'use strict';

import { configure } from 'enzyme'; // enzyme it's a library  to test the react // it's a method that built in the enzyme package
import Adapter from 'enzyme-adapter-react-16';

configure({adapter : new Adapter});