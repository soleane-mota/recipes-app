import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../Context/RecipesProvider';
import DoneRecipes from '../pages/DoneRecipes';

describe('All tests', () => {
  it('Test done recipes', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/done-recipes' }] }>
        <RecipesProvider>
          <DoneRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const recipe = screen.getByText('Spicy Arrabiata Penne');
    expect(recipe).toBeInTheDocument();
  });

  it('Test share button', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/done-recipes' }] }>
        <RecipesProvider>
          <DoneRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const share = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(share);
    expect(screen).toContain('Link copied!');
  });
});
