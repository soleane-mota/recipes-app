import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/RecipesContext';

function ButtonDoneRecipes({ name }) {
  const id = name.toLowerCase();
  const { isloading, setButtonfilter, buttonFilter, setIsloadingFilter } = useContext(RecipesContext);

  return (
    <div>
      <button
        value={ name }
        data-testid={ `filter-by-${id}-btn` }
        onClick={ (e) => {
          if (e.target.value === buttonFilter) {
            setIsloadingFilter(true);
            setButtonfilter('');
          }
          if (e.target.value !== buttonFilter) {
            setButtonfilter(e.target.value);
            setIsloadingFilter(false);
            // setLocation(location.pathname);
          }
        } }
      >
        {name === 'All' ? name : `${name}s`}
      </button>
    </div>
  );
}

ButtonDoneRecipes.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ButtonDoneRecipes;
