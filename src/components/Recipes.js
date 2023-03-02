import React, { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';

function Recipes() {
  const mealsRoute = useRouteMatch('/meals');
  const { mealAPI, drinkAPI, isloading } = useContext(RecipesContext);

  const maxMealPerPage = 12;
  const mealCard = (
    <div>
      {mealAPI.slice(0, maxMealPerPage).map(({ strMeal, idMeal, strMealThumb }) => (
        <div key={ idMeal } data-testid={ `${idMeal}-recipe-card` }>
          <h3 data-testid={ `${idMeal}-card-name` }>{strMeal}</h3>
          <img
            alt={ strMeal }
            src={ strMealThumb }
            data-testid={ `${idMeal}-card-img` }
            style={ { maxWidth: '100px' } }
          />
        </div>
      ))}
    </div>
  );

  const drinkCard = (
    <div>
      {drinkAPI.slice(0, maxMealPerPage).map(({ strDrink, idDrink, strDrinkThumb }) => (
        <div key={ idDrink } data-testid={ `${idDrink}-recipe-card` }>
          <h3 data-testid={ `${idDrink}-card-name` }>{strDrink}</h3>
          <img
            alt={ strDrink }
            src={ strDrinkThumb }
            data-testid={ `${idDrink}-card-img` }
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
