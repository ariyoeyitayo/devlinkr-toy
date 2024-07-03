import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import DeveloperList from './DeveloperList';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';

function Home({ developers, onSearch, isLoading }) {
  const navigate = useNavigate();

  const handleSelectDeveloper = (developer) => {
    if (developer && developer.id) {
      navigate(`/developer/${developer.id}`);
    } else {
      console.error("Developer ID is undefined");
    }
  };

  return (
    <div className=''>
      <header className="App-header">
        <div className='flex justify-between'>
          <h1 className=' p-3 text-[27px] font-medium'>devlinkr.</h1>
          <Link to="/waitlist" className='px-3 py-[10px] bg-black text-white my-4 mx-5 border rounded-md hover:border hover:border-black hover:bg-white hover:text-black transition-[1s]'>Join Our Waitlist</Link>
        </div>
        <h1 className=' text-center font-medium text-[2rem]'> Connect, Learn and Grow<br/> in the tech space.</h1>
        <p className=' text-center md:px-[25vw] py-[0.6rem]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias natus voluptatibus nostrum mollitia nobis minima, sunt similique rerum tempora.</p>
      </header>
      <SearchBar onSearch={onSearch} developers={developers} />
      <div className="content">
        <ErrorBoundary>
          {isLoading ? (
            <div className="loader text-center justify-center items-center">Loading...</div>
          ) : (
            <DeveloperList 
              developers={developers} 
              onSelectDeveloper={handleSelectDeveloper}
            />
          )}
        </ErrorBoundary>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
