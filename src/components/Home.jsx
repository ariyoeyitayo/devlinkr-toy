// components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DeveloperList from './DeveloperList';
import ErrorBoundary from './ErrorBoundary';

function Home({ developers, onSearch }) {
  const navigate = useNavigate();

  const handleSelectDeveloper = (developer) => {
    if (developer && developer.id) {
      navigate(`/developer/${developer.id}`);
    } else {
      console.error("Developer ID is undefined");
    }
  };

  return (
    <div className='h-200vw'>
      <header className="App-header">
        <div><h1 className='text-white p-3 text-[30px] font-medium'>devlinkr.</h1></div>
        <h1 className='text-white text-center font-medium text-[2.5rem]'>meet, learn, connect <br/> and grow in the tech space.</h1>
        <p className='text-white text-center px-[17vw] py-[1rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias natus voluptatibus nostrum mollitia nobis minima, sunt similique rerum tempora. Sit repudiandae reprehenderit vel quidem quo impedit accusantium et reiciendis quae.</p>
      </header>
      <SearchBar onSearch={onSearch} developers={developers} />
      <div className="content">
        <ErrorBoundary>
          <DeveloperList 
            developers={developers} 
            onSelectDeveloper={handleSelectDeveloper}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Home;
