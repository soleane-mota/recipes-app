import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import APIDrink from '../APIFetch/fetchDrink';
import APIMeal from '../APIFetch/fetchMeal';

function RecipesProvider({ children }) {
  const [isloading, setIsloading] = useState(true);
  const [location, setLocation] = useState('/meals');
  const [isloadingFilter, setIsloadingFilter] = useState(true);
  const [buttonFilter, setButtonfilter] = useState('');
  const [mealAPI, setMealAPI] = useState([]);
  const [drinkAPI, setDrinkAPI] = useState([]);
  const [mealAPICategory, setMealAPICategory] = useState([]);
  const [drinkAPICategory, setDrinkAPICategory] = useState([]);
  const [mealAPIFilter, setMealAPIFilter] = useState([]);
  const [drinkAPIFilter, setDrinkAPIFilter] = useState([]);

  useEffect(() => {
    const getMeals = async () => {
      const response = await APIMeal('search.php?s=', '');
      setMealAPI(response);
      setIsloading(false);
    };
    const getDrinks = async () => {
      const response = await APIDrink('search.php?s=', '');
      setDrinkAPI(response);
      setIsloading(false);
    };
    const getMealsCategory = async () => {
      const response = await APIMeal('list.php?c=list', '');
      setMealAPICategory(response);
      setIsloading(false);
    };
    const getDrinksCategory = async () => {
      const response = await APIDrink('list.php?c=list', '');
      setDrinkAPICategory(response);
      setIsloading(false);
    };
    getMeals();
    getMealsCategory();
    getDrinks();
    getDrinksCategory();
  }, []);

  useEffect(() => {
    const isClick = () => {
      if (!isloadingFilter) {
        if (location === '/meals') {
          const getMealFilter = async () => {
            const response = await APIMeal('filter.php?c=', buttonFilter);
            setMealAPIFilter(response);
          };
          getMealFilter();
        } if (location === '/drinks') {
          const getDrinkFilter = async () => {
            const response = await APIDrink('filter.php?c=', buttonFilter);
            setDrinkAPIFilter(response);
          };
          getDrinkFilter();
        }
      }
    };
    isClick();
  }, [buttonFilter, isloadingFilter, location]);

  const context = useMemo(
    () => ({
      isloading,
      isloadingFilter,
      mealAPI,
      drinkAPI,
      drinkAPICategory,
      mealAPICategory,
      buttonFilter,
      drinkAPIFilter,
      mealAPIFilter,
      setIsloadingFilter,
      setButtonfilter,
      setLocation,
    }),
    [isloading,
      mealAPI,
      drinkAPI,
      drinkAPICategory,
      mealAPICategory,
      buttonFilter,
      drinkAPIFilter,
      mealAPIFilter,
      isloadingFilter],
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
