import { render } from '@testing-library/react-native';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Back } from '../src/modules/shared/components/Back';
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: ''
}))
describe('<App />', () => {
  it('has 1 child', () => {
    const button = render(<NavigationContainer>
      <Back/>
    </NavigationContainer>)
    expect(button).toBeTruthy();
  });
});
