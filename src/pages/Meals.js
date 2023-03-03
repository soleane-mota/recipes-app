import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" showSearch />
      <Recipes />
    </div>
  );
}

export default Meals;
