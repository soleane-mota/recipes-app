import React from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" showSearch />
      <Recipes />
    </div>
  );
}

export default Drinks;
