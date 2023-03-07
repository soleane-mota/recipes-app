import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../Context/RecipesProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const mockedWriteText = jest.fn();

navigator.clipboard = {
  writeText: mockedWriteText,
};

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const PATHNAME = '/favorite-recipes';
const NAME = '0-horizontal-name';

describe('All tests', () => {
  it('Test done recipes', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: PATHNAME }] }>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const recipe = screen.getByTestId(NAME);
    expect(recipe).toBeInTheDocument();
  });

  it('Test share button', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: PATHNAME }] }>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const share = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(share);
    expect(mockedWriteText).toHaveBeenCalledTimes(1);
  });

  it('Test favorite button', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: PATHNAME }] }>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const share = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(share);
    expect(mockedWriteText).toHaveBeenCalledTimes(1);
  });

  it('Test link image', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: PATHNAME }] }>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    userEvent.click(screen.getByTestId('0-horizontal-card'));

    expect(mockHistoryPush).toHaveBeenCalledWith('/meals/52771');
  });

  it('Test button filter', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: PATHNAME }] }>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId(NAME)).toHaveTextContent('Spicy Arrabiata Penne');

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId(NAME)).toHaveTextContent('Aquamarine');
  });
});
