export default async function APIDrink(drink, button) {
  const URLDrinks = `https://www.thecocktaildb.com/api/json/v1/1/${drink}${button}`;
  const response = await fetch(URLDrinks);

  const data = await response.json();

  return data.drinks;
}
