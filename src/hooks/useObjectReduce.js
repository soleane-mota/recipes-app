import { useState } from 'react';

export default function useObjectReduce(objectToReduce, string) {
  const [results, setResults] = useState([]);

  function filterObjectKeys() {
    const newObject = Object.keys(objectToReduce)
      .filter((key) => key.includes(string))
      .reduce((cur, key) => Object.assign(cur, { [key]: objectToReduce[key] }), {});
    const filteredObject = Object
      .fromEntries(Object.entries(newObject).filter(([key, value]) => (
        value !== null && value !== key && value !== ' ' && value !== '')));
    setResults(Object.values(filteredObject));
  }

  return { results, filterObjectKeys };
}
