import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import clipboardCopy from 'clipboard-copy';
import useFetch from '../hooks/useFetch';
import useObjectReduce from '../hooks/useObjectReduce';
import RecipesContext from '../Context/RecipesContext';
import '../styles/recipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';


export default function RecipeDetails() {
  const { pathname } = useLocation();
  const history = useHistory();
  const { mealAPI, drinkAPI } = useContext(RecipesContext);
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;
  const [copy, setCopy] = useState(false);

  const [recomendedMeal, setRecomendedMeal] = useState([]);
  const [recomendedDrink, setRecomendedDrink] = useState([]);
  const [heartImg, setHeartImg] = useState(whiteHeartIcon);

  const { specificFood, loading } = useFetch(url);
  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const whatRecomended = pathname.includes('meals') ? recomendedDrink : recomendedMeal;

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite?.some((fav) => fav.id === id)) setHeartImg(blackHeartIcon);
  }, []);

  useEffect(() => {
    const sixRecomended = 6;
    setRecomendedDrink(drinkAPI?.slice(0, sixRecomended));
    setRecomendedMeal(mealAPI?.slice(0, sixRecomended));
  }, [mealAPI, drinkAPI]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const share = (urlID) => {
    clipboardCopy(`http://localhost:3000/${urlID}${id}`);
    setCopy(true);
  };

  function handleClick() {
    if (pathname.includes('meals')) {
      history.push(`/meals/${id}/in-progress`);
    } else history.push(`/drinks/${id}/in-progress`);
  }

  const favoriteRecipe = (e, obj) => {
    const oldFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let newFavorites = [];
    if (oldFavorites) {
      newFavorites = [...oldFavorites];
    }
    newFavorites.push(obj);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    if (e.target.src.includes('blackHeart')) {
      const filteredFav = newFavorites?.filter((fav) => fav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFav));
      setHeartImg(whiteHeartIcon);
    } else setHeartImg(blackHeartIcon);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
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
        {copy && <p>Link copied!</p>}
        <img
          src={ heartImg }
          aria-hidden="true"
          alt="favorite"
          data-testid="favorite-btn"
          onClick={ (e) => {
            const mealFavorite = {
              id: specificFood.idMeal,
              name: specificFood.strMeal,
              type: 'meal',
              nationality: specificFood.strArea,
              category: specificFood.strCategory,
              alcoholicOrNot: '',
              image: specificFood.strMealThumb,
            };
            const drinkFavorite = {
              id: specificFood.idDrink,
              name: specificFood.strDrink,
              type: 'drink',
              nationality: '',
              category: specificFood.strCategory,
              alcoholicOrNot: specificFood.strAlcoholic,
              image: specificFood.strDrinkThumb,
            };
            favoriteRecipe(
              e,
              pathname.includes('meals') ? mealFavorite : drinkFavorite,
            );
          } }
        />
        {measure.results?.map((qntt, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${qntt} ${ingredient.results[index]}` }
          </p>
        ))}
        <p data-testid="instructions">{ specificFood.strInstructions }</p>
        { !specificFood.strYoutube ? '' : (
          <iframe
            data-testid="video"
            title="video"
            width="450"
            height="315"
            src={ specificFood.strYoutube.replace('watch?v=', 'embed/') }
          />
        )}
      </div>
      <Carousel responsive={ responsive } slidesToSlide={ 2 }>
        {whatRecomended?.map((food, index) => (
          <div key={ index } data-testid={ `${index}-recommendation-card` }>
            <p data-testid={ `${index}-recommendation-title` }>
              { food.strMeal || food.strDrink }
            </p>
            <img
              src={ food.strMealThumb || food.strDrinkThumb }
              alt={ food.strMeal || food.strDrink }
              style={ { maxWidth: 200 } }
            />
          </div>
        ))}
      </Carousel>
      <button
        data-testid="start-recipe-btn"
        className="btn-start"
        onClick={ handleClick }
      >
        Start Recipe
      </button>
    </div>
  );
}
