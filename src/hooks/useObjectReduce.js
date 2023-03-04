import { useState } from 'react';

export default function useObjectReduce(objectToReduce, string) {
  const [results, setResults] = useState([]);

  function filterObjectKeys() {
    const hasObj = objectToReduce.length ? objectToReduce[0] : objectToReduce;
    const newObject = Object.keys(hasObj)
      .filter((key) => key.includes(string))
      .reduce((cur, key) => Object.assign(cur, { [key]: hasObj[key] }), {});
    const filteredObject = Object
      .fromEntries(Object.entries(newObject).filter(([key, value]) => (
        value !== null && value !== key && value !== ' ' && value !== '')));
    setResults(Object.values(filteredObject));
  }

  return { results, filterObjectKeys };
}
