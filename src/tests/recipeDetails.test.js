import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';

const mockedWriteText = jest.fn();

navigator.clipboard = {
  writeText: mockedWriteText,
};

describe('testes da página de detalhes das receitas', () => {
  it('verifica se os detalhes da receita "Spicy Arrabiata Penne" estão corretos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockImplementation(fetch);
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/meals/52771');
    });

    await waitFor(() => {
      const name = screen.getByText('Spicy Arrabiata Penne');
      expect(name).toBeInTheDocument();
      const img = screen.getByRole('img', { name: /spicy arrabiata penne/i });
      expect(img).toBeInTheDocument();
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
      const share = screen.getByTestId('share-btn');
      userEvent.click(share);
      expect(mockedWriteText).toHaveBeenCalledTimes(1);
      const startButton = screen.getByRole('button', { name: /start recipe/i });
      userEvent.click(startButton);
      expect(history.location.pathname).toBe('/meals/52771/in-progress');
    }, { timeout: 3000 });
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
});
