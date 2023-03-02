export default async function APIDrink() {
  const URLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URLDrinks);

  const data = await response.json();

  return data.drinks;
}
