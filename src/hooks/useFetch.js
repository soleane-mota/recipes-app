export default function useFetch(setContextParams, url) {
  const [error, setError] = useState(null);

  fetchFood = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      setContextParams(result);
    } catch (e) {
      setError(e);
    }
  };
  return { error, fetchFood };
}
