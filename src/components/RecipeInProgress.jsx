import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import useObjectReduce from '../hooks/useObjectReduce';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from '../styles/RecipeInProgress.module.css';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;

  const [copy, setCopy] = useState(false);
  const [specificFood, setSpecificFood] = useState({});
  const [specificRenderFood, setspecificRenderFood] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const { fetchFood, loading } = useFetch(setspecificRenderFood, setSpecificFood, url);

  useEffect(() => {
    fetchFood();
    setspecificRenderFood([specificFood]);
  }, []);

  useEffect(() => {
    ingredient.filterObjectKeys();
    measure.filterObjectKeys();
  }, [specificFood]);

  const share = (urlID) => {
    clipboardCopy(`http://localhost:3000/${urlID}${id}/in-progress`);
    setCopy(true);
  };

  const handleSubmit = () => {
    history.push('/done-recipes');
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
  const handleChecked = (item, checked, value) => {
    ingredient.results.map((element) => element === value && setIsChecked(checked));

    const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('meals')) {
      const inProgressMeals = {
        ...getInProgress,
        meals: { [id]: [`${item} ${value}`] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressMeals));
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        drinks: { [id]: [
          ...inProgressRecipes.meals[id],
          `${item} ${ingredient.results[index]}`,
        ] },
      });
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      { specificRenderFood?.map((food, idx) => (
        <div key={ idx }>
          <h2 data-testid="recipe-title">{ food.strMeal || food.strDrink }</h2>
          <img
            src={ food.strMealThumb || food.strDrinkThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
            style={ { maxWidth: 200 } }
          />
          <h3
            data-testid="recipe-category"
          >
            { pathname.includes('meals') ? food.strCategory : food.strAlcoholic }
          </h3>
          <img
            src={ shareIcon }
            alt="compartilhar"
            aria-hidden="true"
            data-testid="share-btn"
            onClick={ () => share(pathname.includes('meals') ? 'meals/' : 'drinks/') }
          />
          <img
            src={ whiteHeartIcon }
            alt="favorite"
            data-testid="favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            aria-hidden="true"
          />
          {copy && <p>Link copied!</p>}
          {measure.results.map((item, index) => (
            <div key={ index }>
              <label
                htmlFor={ index }
                data-testid={ `${index}-ingredient-step` }
                className={ isChecked ? styles.checkedIngredientes : undefined }
              >
                <input
                  type="checkbox"
                  value={ ingredient.results[index] }
                  id={ index }
                  // checked={ inProgressRecipes[id]
                  //   .includes(`${item} ${ingredient.results[index]}`) }
                  onChange={ (
                    { target: { checked, value } },
                  ) => handleChecked(item, checked, value) }
                />
                { `${item} ${ingredient.results[index]}` }
              </label>
            </div>
          ))}
          <p data-testid="instructions">{ food.strInstructions }</p>
        </div>
      ))}
      <button
        type="submit"
        onClick={ handleSubmit }
        style={ { position: 'fixed', bottom: '0px' } }
        data-testid="finish-recipe-btn"
      >
        Done Recipe
      </button>
    </div>
  );
}
