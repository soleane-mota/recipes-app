import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import APIDrink from '../APIFetch/fetchDrink';
import APIMeal from '../APIFetch/fetchMeal';
import APIDrinkCategory from '../APIFetch/fetchDrinkCategory';
import APIMealCategory from '../APIFetch/fetchMealCategory';

function RecipesProvider({ children }) {
  const [isloading, setIsloading] = useState(true);
  const [mealAPI, setMealAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);
  const [drinkAPICategory, setDrinkAPICategory] = useState([]);
  const [mealAPICategory, setMealAPICategory] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const response = await APIMeal();
      setMealAPI(response);
      setIsloading(false);
    };
    const getMealsCategory = async () => {
      const response = await APIMealCategory();
      setMealAPICategory(response);
      setIsloading(false);
    };
    const getDrinks = async () => {
      const response = await APIDrink();
      setDrinkAPI(response);
      setIsloading(false);
    };
    const getDrinksCategory = async () => {
      const response = await APIDrinkCategory();
      setDrinkAPICategory(response);
      setIsloading(false);
    };
    getMeals();
    getMealsCategory();
    getDrinks();
    getDrinksCategory();
  }, []);

  const context = useMemo(
    () => ({
      isloading,
      mealAPI,
      drinkAPI,
      drinkAPICategory,
      mealAPICategory,
    }),
    [drinkAPI, isloading, mealAPI, drinkAPICategory, mealAPICategory],
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
