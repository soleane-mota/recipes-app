import React from 'react';
import ButtonDoneRecipes from '../components/ButtonDoneRecipes';
import CardDoneRecipes from '../components/CardDoneRecipes';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" showSearch />
      <ButtonDoneRecipes name="All" />
      <ButtonDoneRecipes name="Meal" />
      <ButtonDoneRecipes name="Drink" />
      <CardDoneRecipes />
    </div>
  );
}
