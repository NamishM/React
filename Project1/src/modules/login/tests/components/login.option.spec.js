/* eslint-disable react/jsx-filename-extension */
// REASON: Need to determine if *.jsx will be recodnized by
// mocha / enzyme configuration.

import React from 'react';
// import { shallow } from 'enzyme';
import Option from '../../components/Option';
import renderer from 'react-test-renderer';


const describe = global.describe;
const it = global.test;

const expect = global.expect;

describe('login -> components -> <Option />', () => {
  it('renders an <option tag with the id as the val and name as the textnode', () => {
    const component = renderer.create(
      <Option name="testName" id={1} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
