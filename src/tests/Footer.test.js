import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes do componente Footer', () => {
  it('Verifica se o componete existe', () => {
    render(<Footer />);

    const tagFooter = screen.getByRole('contentinfo');
    expect(tagFooter).toBeInTheDocument();
  });

  it('Verifica se possue um ícone que redireciona para tela Drinks', () => {
    const { history } = renderWithRouter(<Footer />, ['/meals']);

    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();
    expect(btnDrinks.src).toContain('drinkIcon.svg');

    userEvent.click(btnDrinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });

  it('Verifica se possue um ícone que redireciona para tela Drinks', () => {
    const { history } = renderWithRouter(<Footer />, ['/drinks']);

    const btnMeals = screen.getByTestId('meals-bottom-btn');
    expect(btnMeals).toBeInTheDocument();
    expect(btnMeals.src).toContain('mealIcon.svg');

    userEvent.click(btnMeals);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
