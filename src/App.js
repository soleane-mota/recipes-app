import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipesProvider from './Context/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import MealDetails from './pages/MealDetails';
import DrinkDetails from './pages/DrinkDetails';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <RecipesProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/meals/:id" component={ MealDetails } />
            <Route exact path="/drinks/:id" component={ DrinkDetails } />
            <Route
              exact
              path="/meals/:id-da-receita/in-progress"
              component={ MealInProgress }
            />
            <Route
              exact
              path="/drinks/:id-da-receita/in-progress"
              component={ DrinkInProgress }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </div>
      </Router>
    </RecipesProvider>
  );
}

export default App;
