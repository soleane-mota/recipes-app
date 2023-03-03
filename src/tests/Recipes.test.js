import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import Meals from '../pages/Meals';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(meals) },
  );
});

test('Verifica se a API é chamada', () => {
  render(<App />);
  expect(global.fetch).toHaveBeenCalledTimes(4);
});

// test('Verifica se aparecem 12 comidas na tela', () => {
//   render(<Meals />);
//   expect(screen.getByText('Meals')).toBeInTheDocument();
// });
