import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../Context/RecipesContext';

function ButtonDoneRecipes({ name }) {
  const id = name.toLowerCase();
  const { setButtonfilter } = useContext(RecipesContext);

  return (
    <div>
      <button
        value={ name }
        data-testid={ `filter-by-${id}-btn` }
        onClick={ () => setButtonfilter(name) }
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
