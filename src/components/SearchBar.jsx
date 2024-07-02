import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

function SearchBar({ onSearch, developers }) {
  console.log("SearchBar received developers:", developers);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const nameSuggestions = developers
        .filter(dev => `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(value.toLowerCase()))
        .map(dev => ({ name: `${dev.firstName} ${dev.lastName}`, type: 'name' }));

      const statusSuggestions = developers
        .filter(dev => dev.devStatus.toLowerCase().includes(value.toLowerCase()))
        .map(dev => ({ name: dev.devStatus, type: 'status' }));

      setSuggestions([...nameSuggestions, ...statusSuggestions]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch();
  };

  return (
    <div className="search-bar flex justify-center p-8">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button onClick={handleSearch} className="search-button bg-gray-900 text-white px-4 py-2 rounded ml-2">
          <i className="fa-solid fa-search"></i>
        </button>
        {suggestions.length > 0 && (
          <ul ref={suggestionsRef} className="suggestions absolute left-0 right-0 bg-white border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion.name)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.name} <span className="text-gray-400 text-sm">({suggestion.type})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
