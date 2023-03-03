import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

function ButtonFilter() {
  const mealsRoute = useRouteMatch('/meals');
  const { drinkAPICategory, mealAPICategory } = useContext(RecipesContext);
  const maxListCategory = 5;

  const category = () => {
    if (!mealsRoute) {
      return drinkAPICategory;
    }
    return mealAPICategory;
  };

  return (
    <div>
      {category().slice(0, maxListCategory).map(({ strCategory }) => (
        <button
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          {strCategory}

        </button>))}

    </div>
  );
}

export default ButtonFilter;
