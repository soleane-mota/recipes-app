import { useState } from 'react';

export default function useFetch(setContextParams, url) {
  const [error, setError] = useState(null);

  const fetchFood = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      setContextParams(url.includes('meal') ? result.meals : result.drinks);
    } catch (e) {
      setError(e);
    }
  };
  return { error, fetchFood };
}
