import React, { useContext } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

function ButtonFilter() {
  const mealsRoute = useRouteMatch('/meals');
  const location = useLocation();
  const { drinkAPICategory,
    mealAPICategory,
    setButtonfilter,
    buttonFilter,
    setIsloadingFilter,
    setLocation } = useContext(RecipesContext);
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
          value={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ (e) => {
            if (e.target.value === buttonFilter) {
              setIsloadingFilter(true);
              setButtonfilter('');
            }
            if (e.target.value !== buttonFilter) {
              setButtonfilter(e.target.value);
              setIsloadingFilter(false);
              setLocation(location.pathname);
            }
          } }
        >
          {strCategory}

        </button>))}
      <button
        data-testid="All-category-filter"
        value="All"
        onClick={ () => {
          setButtonfilter('');
          setIsloadingFilter(true);
        } }
      >
        All
      </button>
    </div>
  );
}

export default ButtonFilter;
