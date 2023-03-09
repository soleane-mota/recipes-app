import React, { useState, useContext } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function CardFavoritesRecipes() {
  // const favorites = [
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];

  // localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));

  // tudo o que está acima é pra deletar no push
  const [copy, setCopy] = useState({});
  const { buttonFilter } = useContext(RecipesContext);
  const history = useHistory();
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const variableDataTestID = (type, nationality, category, alcoholicOrNot) => {
    if (type === 'meal') {
      return `${nationality} - ${category}`;
    }
    if (type === 'drink') {
      return `${alcoholicOrNot}`;
    }
  };

  const share = (name, id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setCopy({ name });
  };

  const favorite = (name, id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    const oldFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = oldFavorite.filter((item) => item.name !== name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const favoriteFilter = () => {
    if (buttonFilter === 'Drink') {
      const drink = favoriteRecipes.filter((item) => item.type === 'drink');
      return drink;
    }
    if (buttonFilter === 'Meal') {
      const meal = favoriteRecipes.filter((item) => item.type === 'meal');
      return meal;
    }
    return favoriteRecipes;
  };

  return (
    <div>
      { favoriteFilter()
        .map(
          (
            {
              id,
              type,
              nationality,
              category,
              alcoholicOrNot,
              name,
              image },
            index,
          ) => (
            <div key={ index }>
              <div
                key={ index }
                aria-hidden="true"
                data-testid={ `${index}-horizontal-card` }
                onClick={ () => history.push(`/${type}s/${id}`) }
              >
                <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
                <img
                  alt={ name }
                  src={ image }
                  data-testid={ `${index}-horizontal-image` }
                  style={ { maxWidth: '100px' } }
                />
              </div>
              <h4 data-testid={ `${index}-horizontal-top-text` }>{category}</h4>
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                {variableDataTestID(type, nationality, category, alcoholicOrNot)}
              </h5>
              { variableDataTestID() }
              <img
                src={ shareIcon }
                alt="compartilhar"
                aria-hidden="true"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => share(name, id, type) }
              />
              {copy.name === name ? <p>Link copied!</p> : ''}
              <img
                src={ blackHeartIcon }
                alt="favoritar"
                aria-hidden="true"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => favorite(name, id, type) }
              />
            </div>),
        ) }
    </div>
  );
}

export default CardFavoritesRecipes;
