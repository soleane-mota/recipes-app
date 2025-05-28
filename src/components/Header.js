import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  const isMealsPage = location.pathname === '/meals';
  const isDrinksPage = location.pathname === '/drinks';
  const isProfile = location.pathname === '/profile';
  const isDoneRecipes = location.pathname === '/done-recipes';
  const isFavoriteRecipes = location.pathname === '/favorite-recipes';

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const showSearchIcon = !isProfile && !isDoneRecipes && !isFavoriteRecipes;

  const pageTitle = () => {
    switch (true) {
    case isMealsPage:
      return 'Meals';
    case isDrinksPage:
      return 'Drinks';
    case isProfile:
      return 'Profile';
    case isDoneRecipes:
      return 'Done Recipes';
    case isFavoriteRecipes:
      return 'Favorite Recipes';
    default:
      break;
    }
  };

  return (
    <header>
      <img
        src={ profileIcon }
        alt="Ícone de perfil"
        aria-hidden="true"
        data-testid="profile-top-btn"
        onClick={ handleProfileClick }
      />

      {showSearch && <SearchBar type="text" data-testid="search-input" />}
      <h1 data-testid="page-title">{pageTitle()}</h1>

      {showSearchIcon && (
        <img
          src={ searchIcon }
          alt="Ícone de pesquisa"
          aria-hidden="true"
          data-testid="search-top-btn"
          onClick={ toggleSearch }
        />
      )}
    </header>
  );
}

export default Header;
