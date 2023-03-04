import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import RecipesProvider from '../Context/RecipesProvider';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(meals) },
  );
});

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(drinks) },
  );
});

test('Verifica se a API é chamada', () => {
  render(<App />);
  expect(global.fetch).toHaveBeenCalledTimes(4);
});

test('Verifica se aparecem 12 comidas na tela', async () => {
  render(<App />);
  const email = screen.getByTestId('email-input');
  const password = screen.getByTestId('password-input');
  const submit = screen.getByTestId('login-submit-btn');
  userEvent.type(email, 'email@mail.com');
  userEvent.type(password, '1234567');
  expect(submit).toBeEnabled();
  userEvent.click(submit);
});

it('Verifica se possui um ícone que redireciona para tela Drinks', async () => {
  render(<RecipesProvider><App /></RecipesProvider>, ['/meals']);

  await waitFor(() => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  const btnDrinks = screen.getAllByRole('button');
  expect(btnDrinks).toHaveLength(6);

  const carregando = screen.getByText('Corba');
  expect(carregando).toBeInTheDocument();
}, 30000);
