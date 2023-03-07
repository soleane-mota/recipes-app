import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import RecipesProvider from '../Context/RecipesProvider';
import RecipeDetails from '../components/RecipeDetails';

describe('testes da página de detalhes das receitas', () => {
  it('verifica se os detalhes da receita "corba" estão corretos', async () => {
    render(
      <MemoryRouter initialEntries={ [{ pathname: '/meals/52977' }] }>
        <RecipesProvider>
          <RecipeDetails />
        </RecipesProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
