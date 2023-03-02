import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import APIDrink from '../APIFetch/fetchDrink';
import APIMeal from '../APIFetch/fetchMeal';

function RecipesProvider({ children }) {
  const [isloading, setIsloading] = useState(true);
  const [mealAPI, setMealAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const response = await APIMeal();
      setMealAPI(response);
      setIsloading(false);
    };
    const getDrinks = async () => {
      const response = await APIDrink();
      setDrinkAPI(response);
      setIsloading(false);
    };
    getMeals();
    getDrinks();
  }, []);

  const context = useMemo(
    () => ({
      isloading,
      mealAPI,
      drinkAPI,
    }),
    [drinkAPI, isloading, mealAPI],
  );

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
