import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Meals from './pages/Meals';
import Login from './pages/Login';
import Drinks from './pages/Drinks';
import RecipesProvider from './Context/RecipesProvider';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/meals">
            <Meals />
          </Route>
          <Route exact path="/drinks">
            <Drinks />
          </Route>
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
