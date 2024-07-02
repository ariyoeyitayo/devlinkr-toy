import React, { useState, useEffect } from 'react';
import '../App.css';

function DeveloperList({ developers, onSelectDeveloper, showPagination }) {
  const [currentPage, setCurrentPage] = useState(1);
  const developersPerPage = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        return nextPage > Math.ceil(developers.length / developersPerPage) ? 1 : nextPage;
      });
    }, 5000); // Change page every 5 seconds

    return () => clearInterval(interval);
  }, [developers]);

  // Logic for displaying current developers
  const indexOfLastDeveloper = currentPage * developersPerPage;
  const indexOfFirstDeveloper = indexOfLastDeveloper - developersPerPage;
  const currentDevelopers = developers.slice(indexOfFirstDeveloper, indexOfLastDeveloper);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="developer-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-4 transition-opacity duration-500 ease-in-out">
        {currentDevelopers.map((developer) => (
          <div
            key={developer.id}
            className="developer-card bg-gray-700 text-white rounded-lg shadow-md p-4 cursor-pointer hover:bg-gray-800 transition duration-200"
            onClick={() => onSelectDeveloper(developer)}
          >
            <div className="flex items-center mb-4">
              {developer.img && developer.img.url ? (
                <img
                  src={developer.img.url}
                  alt={`${developer.firstName} ${developer.lastName}`}
                  className="w-16 h-16 rounded-full mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full mr-4 bg-gray-700"></div>
              )}
              <div>
                <h2 className="text-lg font-semibold">{developer.firstName} {developer.lastName}</h2>
                <p className="text-gray-400">{developer.longBio || 'Product Designer'}</p>
                <p className="text-gray-400">{developer.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">{developer.shortBio}</p>
              <p className="text-sm text-gray-400">Role: {developer.role}</p>
            </div>
          </div>
        ))}
      </div>

      {showPagination && developers.length > developersPerPage && (
        <div className="pagination flex justify-center space-x-2 mt-4">
          {[...Array(Math.ceil(developers.length / developersPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeveloperList;
