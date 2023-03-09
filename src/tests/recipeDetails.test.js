import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { spicyLocalMock } from './helpers/spicyLocalMock';
import { ggLocalMock } from './helpers/ggLocalMock';

const mockedWriteText = jest.fn();

navigator.clipboard = {
  writeText: mockedWriteText,
};

const spicyLink = '/meals/52771';
const spicyName = 'Spicy Arrabiata Penne';
const favoriteBtn = 'favorite-btn';

describe('testes da página de detalhes das receitas', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('verifica se os detalhes da receita "Spicy Arrabiata Penne" estão corretos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(spicyLink);
    });

    await waitFor(() => {
      const name = screen.getByText(spicyName);
      expect(name).toBeInTheDocument();
    }, { timeout: 3000 });
    const img = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(img).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('0-ingredient-name-and-measure')).toHaveTextContent('1 pound penne rigate');
      expect(screen.getByTestId('1-ingredient-name-and-measure')).toHaveTextContent('1/4 cup olive oil');
      expect(screen.getByTestId('2-ingredient-name-and-measure')).toHaveTextContent('3 cloves garlic');
      expect(screen.getByTestId('3-ingredient-name-and-measure')).toHaveTextContent('1 tin chopped tomatoes');
      expect(screen.getByTestId('4-ingredient-name-and-measure')).toHaveTextContent('1/2 teaspoon red chile flakes');
      expect(screen.getByTestId('5-ingredient-name-and-measure')).toHaveTextContent('1/2 teaspoon italian seasoning');
      expect(screen.getByTestId('6-ingredient-name-and-measure')).toHaveTextContent('6 leaves basil');
      expect(screen.getByTestId('7-ingredient-name-and-measure')).toHaveTextContent('spinkling Parmigiano-Reggiano');
      expect(screen.getByTestId('instructions')).toHaveTextContent(oneMeal.meals[0].strInstructions);
      expect(screen.getByTestId('video')).toHaveAttribute('src', oneMeal.meals[0].strYoutube.replace('watch?v=', 'embed/'));
    });
    const share = screen.getByTestId('share-btn');
    userEvent.click(share);
    expect(mockedWriteText).toHaveBeenCalledTimes(1);
    const favBtn = screen.getByTestId(favoriteBtn);
    expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
    userEvent.click(favBtn);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'favoriteRecipes',
      JSON.stringify(spicyLocalMock),
    );
    expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    const startButton = screen.getByRole('button', { name: /start recipe/i });
    userEvent.click(startButton);
    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('verifica se os detalhes da receita "GG" estão corretos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/drinks/15997');
    });

    await waitFor(() => {
      const name = screen.getByText('GG');
      expect(name).toBeInTheDocument();
    }, { timeout: 3000 });
    const share = screen.getByTestId('share-btn');
    userEvent.click(share);
    expect(mockedWriteText).toHaveBeenCalledTimes(1);
    const startButton = screen.getByTestId('start-recipe-btn');
    userEvent.click(startButton);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });

  it('verifica se a receita de comida ja vem favoritada caso reinicia a página', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    const { history } = renderWithRouter(<App />);
    jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => JSON.stringify(spicyLocalMock));
    act(() => {
      history.push(spicyLink);
    });
    await waitFor(() => {
      const name = screen.getByText(spicyName);
      expect(name).toBeInTheDocument();
    }, { timeout: 3000 });
    const favBtn = screen.getByTestId(favoriteBtn);
    expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favBtn);
    expect(window.localStorage.setItem).toHaveBeenLastCalledWith(
      'favoriteRecipes',
      '[]',
    );
  });

  it('verifica se a receita de bebida ja vem favoritada caso reinicia a página', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    const { history } = renderWithRouter(<App />);
    jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => JSON.stringify(ggLocalMock));
    act(() => {
      history.push('/drinks/15997');
    });
    await waitFor(() => {
      const name = screen.getByText('GG');
      expect(name).toBeInTheDocument();
    }, { timeout: 3000 });
    const favBtn = screen.getByTestId(favoriteBtn);
    expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favBtn);
    expect(window.localStorage.setItem).toHaveBeenLastCalledWith(
      'favoriteRecipes',
      '[]',
    );
  });
});
