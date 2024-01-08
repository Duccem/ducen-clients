import React from 'react';
import renderer from 'react-test-renderer';

import App from '../src/App';
jest.useFakeTimers()
describe('<App />', () => {
  it('has 1 child', () => {
    const tree: any = renderer.create(<App />).toJSON();
    expect(tree?.children?.length).toBe(1);
  });
});
