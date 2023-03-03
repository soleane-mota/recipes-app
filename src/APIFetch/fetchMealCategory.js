export default async function APIMealCategory() {
  const URLMeal = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URLMeal);

  const data = await response.json();

  return data.meals;
}
