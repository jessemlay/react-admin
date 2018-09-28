/*eslint no-unused-vars: "off"*/
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../index';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
   shallow(<App />);
});
