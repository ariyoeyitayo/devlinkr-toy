import React, { useState, useEffect, useRef } from 'react';
import '../App.css'

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
        .map(dev => `${dev.firstName} ${dev.lastName}`);

      const statusSuggestions = developers
        .filter(dev => dev.devStatus.toLowerCase().includes(value.toLowerCase()))
        .map(dev => dev.devStatus);

      setSuggestions([...new Set([...nameSuggestions, ...statusSuggestions])]); // Remove duplicates
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.error("Search submitted with term:", searchTerm); // Using console.error to ensure it shows up
    onSearch(searchTerm);
    setSuggestions([]);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar w-[5rem]">
      <div className="input-wrapper">
        <input className='w-[6rem] rounded-[50px]' 
          type="text" 
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search developers..."
        />
        {suggestions.length > 0 && (
          <ul className="suggestions" ref={suggestionsRef}>
            {suggestions.map((suggestion, index) => (
              <li typeof='sumbit' key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="submit" className='bg-white'><i className="fa fa-paper-plane"></i></button>
    </form>
  );
}

export default SearchBar;
