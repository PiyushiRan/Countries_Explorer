import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, initialQuery }) {
  const [query, setQuery] = useState(initialQuery || '');

  // Update query when initialQuery changes (e.g., on page refresh or navigation)
  useEffect(() => {
    setQuery(initialQuery || '');
  }, [initialQuery]);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by country name..."
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;