import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import RecipesContext from '../Context/RecipesContext';

function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  const location = useLocation();
  const FIRST_LETTER = 'first-letter';
  // const {  } = useContext(RecipesContext);
  // const {  } = useContext(RecipesContext);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleMealSearchSubmit = async () => {
    let endpoint = '';

    switch (searchType) {
    case 'ingredient':
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
      break;
    case 'name':
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      break;
    case FIRST_LETTER:
      if (searchTerm.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`;
      break;
    default:
      break;
    }

    const response = await fetch(endpoint);
    await response.json();
    console.log(endpoint);
  };

  const handleDrinkSearchSubmit = async () => {
    let endpoint = '';

    switch (searchType) {
    case 'ingredient':
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
      break;
    case 'name':
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;
      break;
    case FIRST_LETTER:
      if (searchTerm.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`;
      break;
    default:
      break;
    }
    const response = await fetch(endpoint);
    await response.json();
    console.log(endpoint);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/meals') {
      handleMealSearchSubmit();
    } else if (location.pathname === '/drinks') {
      handleDrinkSearchSubmit();
    }
  };

  return (
    <div>
      <h1>Recipes</h1>

      <input
        type="text"
        placeholder="Search recipes"
        value={ searchTerm }
        onChange={ handleSearchTermChange }
        data-testid="search-input"
      />

      <label htmlFor="search-by-ingredient">
        <input
          type="radio"
          id="search-by-ingredient"
          name="search-type-ingredient"
          value="ingredient"
          checked={ searchType === 'ingredient' }
          onChange={ handleSearchTypeChange }
          data-testid="ingredient-search-radio"
        />
        Ingredient
      </label>

      <label htmlFor="search-by-name">
        <input
          type="radio"
          id="search-by-name"
          name="search-type-name"
          value="name"
          checked={ searchType === 'name' }
          onChange={ handleSearchTypeChange }
          data-testid="name-search-radio"
        />
        Name
      </label>

      <label htmlFor="search-by-first-letter">
        <input
          type="radio"
          id="search-by-first-letter"
          name="search-type-first-letter"
          value={ FIRST_LETTER }
          checked={ searchType === 'first-letter' }
          onChange={ handleSearchTypeChange }
          data-testid="first-letter-search-radio"
        />
        First letter
      </label>

      <button
        type="button"
        onClick={ handleSubmit }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>

  );
}

export default Recipes;
