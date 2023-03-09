import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import RecipesProvider from '../Context/RecipesProvider';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN = 'login-submit-btn';
const TEST_EMAIL = 'email@mail.com';
const TEST_PASSWORD = '1234567';

describe('All tests', () => {
  it('Test button done recipes', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/' }] }>
        <RecipesProvider>
          <Login />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submit = screen.getByTestId(LOGIN);
    userEvent.type(email, TEST_EMAIL);
    userEvent.type(password, TEST_PASSWORD);
    userEvent.click(submit);

    render(
      <MemoryRouter initialEntries={ [{ pathname: '/profile' }] }>
        <RecipesProvider>
          <Profile />
        </RecipesProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-done-btn'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/done-recipes');
  });

  it('Test button favorites recipes', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/' }] }>
        <RecipesProvider>
          <Login />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submit = screen.getByTestId(LOGIN);
    userEvent.type(email, TEST_EMAIL);
    userEvent.type(password, TEST_PASSWORD);
    userEvent.click(submit);

    render(
      <MemoryRouter initialEntries={ [{ pathname: '/profile' }] }>
        <RecipesProvider>
          <Profile />
        </RecipesProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/favorite-recipes');
  });

  it('Test button done recipes', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/' }] }>
        <RecipesProvider>
          <Login />
        </RecipesProvider>
      </MemoryRouter>,
    );

    const email = screen.getByTestId(EMAIL_INPUT);
    const password = screen.getByTestId(PASSWORD_INPUT);
    const submit = screen.getByTestId(LOGIN);
    userEvent.type(email, TEST_EMAIL);
    userEvent.type(password, TEST_PASSWORD);
    userEvent.click(submit);

    render(
      <MemoryRouter initialEntries={ [{ pathname: '/profile' }] }>
        <RecipesProvider>
          <Profile />
        </RecipesProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
