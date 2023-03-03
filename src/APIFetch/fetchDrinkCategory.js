export default async function APIDrinkCategory() {
  const URLDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URLDrinks);

  const data = await response.json();

  return data.drinks;
}
