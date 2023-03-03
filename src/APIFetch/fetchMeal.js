export default async function APIMeal(meal, button) {
  const URLMeal = `https://www.themealdb.com/api/json/v1/1/${meal}${button}`;
  const response = await fetch(URLMeal);

  const data = await response.json();

  return data.meals;
}
