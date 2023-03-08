import React from 'react';
import ButtonDoneRecipes from '../components/ButtonDoneRecipes';
import CardFavoritesRecipes from '../components/CardFavoritesRecipes';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" showSearch />
      <ButtonDoneRecipes name="All" />
      <ButtonDoneRecipes name="Meal" />
      <ButtonDoneRecipes name="Drink" />
      <CardFavoritesRecipes />
    </div>
  );
}
