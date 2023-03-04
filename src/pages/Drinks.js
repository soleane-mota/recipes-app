import React from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" showSearch />
      <Recipes />
    </div>
  );
}

export default Drinks;
