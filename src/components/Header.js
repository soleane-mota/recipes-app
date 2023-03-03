import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ title }) {
  const location = useLocation();
  const history = useHistory();
  const [showSearch, setShowSearch] = useState(false);
  // const [showSearchInput, setShowSearchInput] = useState(false);
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

  // const toggleSearchInput = () => {
  //     setShowSearchInput(!showSearchInput);
  //   };

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
      return title;
    }
  };

  return (
    <header>
      <Link
        to="/profile"
        data-testid="profile-top-btn"
        onClick={ handleProfileClick }
      >
        <img src={ profileIcon } alt="Ícone de perfil" />
      </Link>
      {showSearchIcon && (
        <button type="button" onClick={ toggleSearch }>
          <img src={ searchIcon } alt="Ícone de pesquisa" />
        </button>
      )}
      {showSearch && <input type="text" data-testid="search-input" />}
      <h1 data-testid="page-title">{pageTitle()}</h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
