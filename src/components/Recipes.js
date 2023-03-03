import React, { useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import ButtonFilter from './ButtonFilter';

function Recipes() {
  const mealsRoute = useRouteMatch('/meals');
  const history = useHistory();
  const { mealAPI,
    drinkAPI,
    isloading,
    buttonFilter,
    mealAPIFilter,
    drinkAPIFilter,
    isloadingFilter } = useContext(RecipesContext);
  const maxMealPerPage = 12;

  const handleClick = (type, id) => {
    history.push(`/${type}/${id}`);
  };

  const filterMainMeal = () => {
    if (buttonFilter !== '' && !isloadingFilter) {
      return mealAPIFilter;
    }
    return mealAPI;
  };

  const filterMainDrink = () => {
    if (buttonFilter !== '' && !isloadingFilter) {
      return drinkAPIFilter;
    }
    return drinkAPI;
  };

  const mealCard = (
    <div>
      <ButtonFilter />
      {filterMainMeal()
        .slice(0, maxMealPerPage)
        .map(({ strMeal, idMeal, strMealThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            aria-hidden="true"
            onClick={ () => handleClick('meals', idMeal) }
          >
            <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
            <img
              alt={ strMeal }
              src={ strMealThumb }
              data-testid={ `${index}-card-img` }
              style={ { maxWidth: '100px' } }
            />
          </div>
        ))}
    </div>
  );

  const drinkCard = (
    <div>
      <ButtonFilter />
      {filterMainDrink()
        .slice(0, maxMealPerPage)
        .map(({ strDrink, idDrink, strDrinkThumb }, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
            aria-hidden="true"
            onClick={ () => handleClick('drinks', idDrink) }
          >
            <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
            <img
              alt={ strDrink }
              src={ strDrinkThumb }
              data-testid={ `${index}-card-img` }
              style={ { maxWidth: '100px' } }
            />
          </div>
        ))}
    </div>
  );

  const mealsAppearing = (<div>{ !isloading ? mealCard : <p>carregando</p> }</div>);
  const drinksAppearing = (<div>{ !isloading ? drinkCard : <p>carregando</p> }</div>);

  return (
    <div>{mealsRoute ? mealsAppearing : drinksAppearing}</div>
  );
}

export default Recipes;
