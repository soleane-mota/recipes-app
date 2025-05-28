import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
// import { spicyLocalMock } from './helpers/spicyLocalMock';
// import { ggLocalMock } from './helpers/ggLocalMock';

const mockedWriteText = jest.fn();

navigator.clipboard = {
  writeText: mockedWriteText,
};

const spicyLink = '/meals/52771/in-progress';
const spicyName = 'Spicy Arrabiata Penne';
// const favoriteBtn = 'favorite-btn';

describe('Testes do componente RecipeInProgress', () => {
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
      expect(screen.getByRole('checkbox', { name: /1 pound penne/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /1\/4 cup olive oil/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /3 cloves garlic/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /1 tin chopped/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /1\/2 teaspoon red chile flakes/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /1\/2 teaspoon italian/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /6 leaves basil/i })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /spinkling Parmigiano-Reggiano/i })).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toHaveTextContent(oneMeal.meals[0].strInstructions);
    });
    const share = screen.getByTestId('share-btn');
    userEvent.click(share);
    expect(mockedWriteText).toHaveBeenCalledTimes(1);
    // const favBtn = screen.getByTestId(favoriteBtn);
    // expect(favBtn).toHaveAttribute('src', whiteHeartIcon);
    // userEvent.click(favBtn);
    // expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(window.localStorage.setItem).toHaveBeenCalledWith(
    //   'favoriteRecipes',
    //   JSON.stringify(spicyLocalMock),
    // );
    // expect(favBtn).toHaveAttribute('src', blackHeartIcon);
    // TODO: Implementar a logica de clicar marcar os checkbox antes do finishBtn
    // const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    // userEvent.click(finishButton);
    // const { pathname } = history.location;
    // expect(pathname).toBe('/done-recipes');
  });

  it('verifica se o botão Finish Recipe é habilitado e redireciona para outra página ao marcar os ingredientes', () => {
    // TODO: Implementar a logica de clicar marcar os checkbox antes do finishBtn
    // const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    // userEvent.click(finishButton);
    // expect(history.location.pathname).toBe('/meals/done-recipes');
  });

  // it('verifica se os detalhes da receita "GG" estão corretos', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockImplementation(fetch);
  //   const { history } = renderWithRouter(<App />);

  //   act(() => {
  //     history.push('/drinks/15997/in-progress');
  //   });

  //   await waitFor(() => {
  //     const name = screen.getByText('GG');
  //     expect(name).toBeInTheDocument();
  //   }, { timeout: 3000 });
  //   const share = screen.getByTestId('share-btn');
  //   userEvent.click(share);
  //   expect(mockedWriteText).toHaveBeenCalledTimes(1);
  //   // TODO: Implementar a logica de clicar marcar os checkbox antes do finishBtn
  //   const finishButton = screen.getByTestId('finish-recipe-btn');
  //   userEvent.click(finishButton);
  //   expect(history.location.pathname).toBe('/drinks/done-recipes');
  // });

  // it('verifica se a receita de comida ja vem favoritada caso reinicia a página', async () => {
  //   Object.defineProperty(window, 'localStorage', {
  //     value: {
  //       getItem: jest.fn(() => null),
  //       setItem: jest.fn(() => null),
  //     },
  //     writable: true,
  //   });
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockImplementation(fetch);
  //   const { history } = renderWithRouter(<App />);
  //   jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => JSON.stringify(spicyLocalMock));
  //   act(() => {
  //     history.push(spicyLink);
  //   });
  //   await waitFor(() => {
  //     const name = screen.getByText(spicyName);
  //     expect(name).toBeInTheDocument();
  //   }, { timeout: 3000 });
  //   const favBtn = screen.getByTestId(favoriteBtn);
  //   expect(favBtn).toHaveAttribute('src', blackHeartIcon);
  //   userEvent.click(favBtn);
  //   expect(window.localStorage.setItem).toHaveBeenLastCalledWith(
  //     'favoriteRecipes',
  //     '[]',
  //   );
  // });

//   it('verifica se a receita de bebida ja vem favoritada caso reinicia a página', async () => {
//     Object.defineProperty(window, 'localStorage', {
//       value: {
//         getItem: jest.fn(() => null),
//         setItem: jest.fn(() => null),
//       },
//       writable: true,
//     });
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockImplementation(fetch);
//     const { history } = renderWithRouter(<App />);
//     jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => JSON.stringify(ggLocalMock));
//     act(() => {
//       history.push('/drinks/15997');
//     });
//     await waitFor(() => {
//       const name = screen.getByText('GG');
//       expect(name).toBeInTheDocument();
//     }, { timeout: 3000 });
//     const favBtn = screen.getByTestId(favoriteBtn);
//     expect(favBtn).toHaveAttribute('src', blackHeartIcon);
//     userEvent.click(favBtn);
//     expect(window.localStorage.setItem).toHaveBeenLastCalledWith(
//       'favoriteRecipes',
//       '[]',
//     );
//   });
});