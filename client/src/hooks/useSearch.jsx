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


/*
example backend usage for this:

app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  //ILIKE to search case insensitively, q is the user input
  const results = await db.query('SELECT * FROM items WHERE name ILIKE $1', [`%${q}%`]); 
  res.json(results.rows);
});

*/