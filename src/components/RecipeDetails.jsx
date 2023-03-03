import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function RecipeDetails() {
  const [specificFood, setSpecificFood] = useState([]);
  const { fetchFood } = useFetch();
  const { id } = useParams();
  const { type } = useContext();

  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (type === 'food') ? meals : drink;

  useEffect(() => {
    fetchFood(setSpecificFood, url);
  }, []);
  return (
    <div>
      {specificFood?.map((food) => (
        <div key={ food.name }>
          <p data-testid="recipe-title">{ food.name }</p>
          <h3
            data-testid="recipe-category"
          >
            { food.category ? food.category : food.alcoholic }
          </h3>
          <img src={ food.img } alt={ food.name } data-testid="recipe-photo" />
          {food.igredients?.map((igredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { igredient }
            </p>
          ))}
          <p data-testid="instructions">{ food.instructions }</p>
          { !food.movie ? '' : (
            <video width="320" height="240" controls>
              <track
                src="captions_en.vtt"
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
              <source src={ food.movie } type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
}
