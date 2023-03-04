import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../Context/RecipesProvider';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const primeiroCard = '0-card-name';
const buttonBeef = 'Beef-category-filter';
const buttonShake = 'Shake-category-filter';

describe('All tests', () => {
  it('Test button filter', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/meals' }] }>
        <RecipesProvider>
          <Meals />
        </RecipesProvider>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByTestId(buttonBeef)).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId(primeiroCard)).toBeInTheDocument();
    }, { timeout: 3000 });

    const carregando = screen.getByText('Corba');
    expect(carregando).toBeInTheDocument();

    userEvent.click(screen.getByTestId(buttonBeef));

    await waitFor(() => {
      expect(screen.getByTestId(primeiroCard)).toHaveTextContent('Beef and Mustard Pie');
    }, { timeout: 3000 });
  });

  it('Test button card Meals', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/meals' }] }>
        <RecipesProvider>
          <Meals />
        </RecipesProvider>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByTestId(buttonBeef)).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId(primeiroCard)).toBeInTheDocument();
    }, { timeout: 3000 });

    userEvent.click(screen.getByTestId(primeiroCard));

    expect(mockHistoryPush).toHaveBeenCalledWith('/meals/52977');
  });

  it('Test button card Drinks', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/drinks' }] }>
        <RecipesProvider>
          <Drinks />
        </RecipesProvider>
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByTestId(buttonShake)).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId(primeiroCard)).toBeInTheDocument();
    }, { timeout: 3000 });

    userEvent.click(screen.getByTestId(buttonShake));
    await waitFor(() => {
      expect(screen.getByTestId(primeiroCard)).toBeInTheDocument();
      expect(screen.getByTestId(primeiroCard)).toHaveTextContent('151 Florida Bushwacker');
    }, { timeout: 3000 });

    userEvent.click(screen.getByTestId(buttonShake));
    expect(screen.getByTestId(primeiroCard)).toHaveTextContent('GG');
    userEvent.click(screen.getByTestId(buttonShake));
    userEvent.click(screen.getByTestId('All-category-filter'));
    expect(screen.getByTestId(primeiroCard)).toHaveTextContent('GG');

    userEvent.click(screen.getByTestId(primeiroCard));

    expect(mockHistoryPush).toHaveBeenCalledWith('/drinks/15997');
  });
});
