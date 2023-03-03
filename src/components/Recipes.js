import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import ButtonFilter from './ButtonFilter';

function Recipes() {
  const mealsRoute = useRouteMatch('/meals');
  const { mealAPI, drinkAPI, isloading } = useContext(RecipesContext);

  const maxMealPerPage = 12;
  const mealCard = (
    <div>
      <ButtonFilter />
      {mealAPI.slice(0, maxMealPerPage).map(({ strMeal, strMealThumb }, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
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
      {drinkAPI.slice(0, maxMealPerPage).map(({ strDrink, strDrinkThumb }, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
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
