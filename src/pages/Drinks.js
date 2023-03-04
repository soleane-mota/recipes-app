import React from 'react';
import Recipes from '../components/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" showSearch />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
