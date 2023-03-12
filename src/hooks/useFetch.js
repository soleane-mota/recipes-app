import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [specificFood, setSpecificFood] = useState({});

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setSpecificFood(url.includes('meal') ? result.meals[0] : result.drinks[0]);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchFood();
  }, [url]);

  return { specificFood, loading };
}
