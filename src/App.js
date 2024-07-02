import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './fontawesome-free-6.4.2-web/css/all.css';
import SearchBar from './components/SearchBar';
import DeveloperList from './components/DeveloperList';
import DeveloperProfile from './components/DeveloperProfile';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://ariyoeyitayo.github.io/host/db.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw data received from API:", data);
        
        // Check the structure of the data
        if (data && Array.isArray(data.developers)) {
          setDevelopers(data.developers);
          setFilteredDevelopers(data.developers);
        } else {
          throw new Error("Data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching developers:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchDevelopers();
  }, []);
  

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    console.log("Developers:", developers);
    if (!Array.isArray(developers) || developers.length === 0) {
      console.error("Developers data is not available or is empty");
      return;
    }
    const filtered = developers.filter(dev => 
      `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.devStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevelopers(filtered);
  };

  if (isLoading) return <div className='loader text-center justify-center items-center'></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App bg-black">
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              developers={filteredDevelopers} 
              onSearch={handleSearch} 
            />
          } 
        />
        <Route path="/developer/:id" element={<DeveloperProfile developers={developers} />} />
      </Routes>
    </div>
  );
}

export default App;
