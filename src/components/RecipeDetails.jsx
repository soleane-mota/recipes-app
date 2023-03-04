import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import useFetch from '../hooks/useFetch';
import useObjectReduce from '../hooks/useObjectReduce';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;

  const [specificFood, setSpecificFood] = useState([]);
  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const { fetchFood } = useFetch(setSpecificFood, url);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

  useEffect(() => {
    ingredient.filterObjectKeys();
    measure.filterObjectKeys();
  }, [ingredient, measure, specificFood]);

  return (
    <div>
      { specificFood?.map((food) => (
        <div key={ food.strMeal || food.strDrink }>
          <p data-testid="recipe-title">{ food.strMeal || food.strDrink }</p>
          <h3
            data-testid="recipe-category"
          >
            { pathname.includes('meals') ? food.strCategory : food.strAlcoholic }
          </h3>
          <img
            src={ food.strMealThumb || food.strDrinkThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
            style={ { maxWidth: 200 } }
          />
          {measure.results?.map((qntt, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${qntt} ${ingredient.results[index]}` }
            </p>
          ))}
          <p data-testid="instructions">{ food.strInstructions }</p>
          { !food.strYoutube ? '' : (
            <ReactPlayer url={ food.strYoutube } data-testid="video" />
          )}
        </div>
      ))}
    </div>
  );
}
