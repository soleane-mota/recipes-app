import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import meals from '../../cypress/mocks/meals';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(meals) },
  );
});

test('Verifica se a API é chamada', () => {
  render(<App />);
  expect(global.fetch).toHaveBeenCalledTimes(4);
});

// test('Verifica se aparecem 12 comidas na tela', async () => {
//   render(<App/>);
// });
