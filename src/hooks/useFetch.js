import { useState } from 'react';

export default function useFetch(setArray, url) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFood = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      setArray(url.includes('meal') ? result.meals[0] : result.drinks[0]);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };
  return { error, fetchFood, loading };
}
