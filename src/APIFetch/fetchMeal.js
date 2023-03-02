export default async function APIMeal() {
  const URLMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URLMeal);

  const data = await response.json();

  return data.meals;
}
