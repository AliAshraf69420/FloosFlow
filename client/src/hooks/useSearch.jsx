import { useState, useEffect } from 'react';

const useSearch = (initialQuery = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        setLoading(true);
        //replace with API endpoint after we do it in the backend or smth
        fetch(`/api/search?q=${query}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data);
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 1000); // Delay by 1 second after typing stops (debouncing)

    return () => clearTimeout(handler); // Cleanup timeout
  }, [query]);

  return { query, setQuery, results, loading };
};

export default useSearch;