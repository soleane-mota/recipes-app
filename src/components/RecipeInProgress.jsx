import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import useObjectReduce from '../hooks/useObjectReduce';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import styles from '../styles/RecipeInProgress.module.css';
// import useLocalStorage from '../hooks/useLocalStorage';

export default function RecipeInProgress() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;

  const [copy, setCopy] = useState(false);
  const [specificFood, setSpecificFood] = useState({});
  const [isChecked, setIsChecked] = useState([]);
  const [hasClassName, setHasClassName] = useState([]);
  // const [inProgressRecipes, setInProgressRecipes] = useLocalStorage(
  //   'inProgressRecipes',
  //   { drinks: {}, meals: {} },
  // );

  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const { fetchFood, loading } = useFetch(setSpecificFood, url);

  // console.log(specificFood);

  useEffect(() => {
    fetchFood();
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

  const handleChecked = useCallback((name) => {
    if (isChecked.includes(name)) {
      const removeCheck = isChecked.filter((element) => element !== name);
      setIsChecked(removeCheck);
    } else {
      setIsChecked([...isChecked, name]);
      

      // const checkItem = (ingredient.results.map((item) => isChecked.includes(item)));
      // setHasClassName(checkItem);
    }
    console.log(hasClassName);
  }, [hasClassName, ingredient, isChecked]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <div>
        <h2 data-testid="recipe-title">
          { specificFood.strMeal || specificFood.strDrink }
        </h2>
        <img
          src={ specificFood.strMealThumb || specificFood.strDrinkThumb }
          alt={ specificFood.strMeal }
          data-testid="recipe-photo"
          style={ { maxWidth: 200 } }
        />
        <h3
          data-testid="recipe-category"
        >
          { pathname.includes('meals')
            ? specificFood.strCategory
            : specificFood.strAlcoholic }
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
        {measure.results?.map((qntt, index) => (
          <div key={ index }>
            <label
              htmlFor={ `ingredient-${index}` }
              data-testid={ `${index}-ingredient-step` }
              className={
                isChecked.includes(ingredient.results[index])
                  ? styles.checkedIngredientes : undefined
              }
            >
              <input
                type="checkbox"
                name={ ingredient.results[index] }
                value={ `${qntt} ${ingredient.results[index]}` }
                id={ `ingredient-${index}` }
                onChange={ ({ target: { name } }) => handleChecked(name) }
              />
              { `${qntt} ${ingredient.results[index]}` }
            </label>
          </div>
        ))}
        <p data-testid="instructions">{ specificFood.strInstructions }</p>
      </div>
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
