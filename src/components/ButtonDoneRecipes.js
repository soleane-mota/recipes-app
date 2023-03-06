import React from 'react';
import PropTypes from 'prop-types';

function ButtonDoneRecipes({ name }) {
  const id = name.toLowerCase();
  const handleClick = (value) => setDrinkOrFood(value);

  // falta passar o state pro context e importar aqui
  return (
    <div>
      <button
        value={ name }
        data-testid={ `filter-by-${id}-btn` }
        onClick={ (e) => handleClick(e.target.value) }
      >
        {name}
      </button>
    </div>
  );
}

ButtonDoneRecipes.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ButtonDoneRecipes;
