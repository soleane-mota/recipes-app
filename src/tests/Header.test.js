import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipesProvider from '../Context/RecipesProvider';
import DoneRecipes from '../pages/DoneRecipes';

const PAGETITLE = 'page-title';
const SEARCH_TOP_BTN = 'search-top-btn';
const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(PAGETITLE)).toBeInTheDocument();
  });

  it('clicks profile button and navigates to profile page', () => {
    const { history } = render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    userEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('displays correct icons for each route', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeVisible();
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeVisible();

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.getByTestId(SEARCH_INPUT)).toBeVisible();

    userEvent.click(screen.getByTestId(PROFILE_TOP_BTN));

    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();

    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(PROFILE_TOP_BTN)).not.toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeVisible();

    render(
      <MemoryRouter initialEntries={ ['/done-recipes'] }>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeVisible();
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  });

  it('displays the correct page title drinks', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(PAGETITLE)).toHaveTextContent('Drinks');
  });

  it('displays the correct page title for each route', () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/favorite-recipes' }] }>
        <RecipesProvider>
          <FavoriteRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId(PAGETITLE)).toHaveTextContent('Favorite Recipes');
  });

  it('displays the correct page title done recipes', () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/done-recipes' }] }>
        <RecipesProvider>
          <DoneRecipes />
        </RecipesProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId(PAGETITLE)).toHaveTextContent('Done Recipes');
  });
});
