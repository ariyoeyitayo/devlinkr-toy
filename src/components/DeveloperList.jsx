import React, { useState, useEffect } from 'react';
import '../App.css';

function DeveloperList({ developers, onSelectDeveloper, showPagination, loading }) {
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
      {loading ? (
        <div className="loader">Loading...</div> // Replace with your loading animation
      ) : (
        <div className="developer-list grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 px-4 py-7 transition-opacity duration-500 ease-in-out">
          {currentDevelopers.map((developer) => (
            <div
              key={developer.id}
              className="developer-card border border-gray-300 text-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-2xl hover:-translate-y-6 transition duration-200"

            >
              <div className="flex items-center mb-4">
                {developer.img && developer.img.url ? (
                  <img
                    src={developer.img.url}
                    alt={`${developer.firstName} ${developer.lastName}`}
                    className=" bg-white border border-gray-400 w-16 h-16 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full mr-4 bg-gray-700"></div>
                )}
                <div>
                  <h2 className="text-[1.4rem] text-gray-800 font-semibold">{developer.firstName} {developer.lastName}</h2>
                  <p className="text-gray-600">{developer.location}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-700 py-2">Bio: {developer.shortBio}</p>
                <div className='flex justify-between' onClick={() => onSelectDeveloper(developer)}> <p className="text-sm text-gray-700">Role: {developer.devStatus}</p>
                <button className='px-4 -translate-y-1 tracking-wide  text-[12px] py-[6px] rounded bg-black text-white'>View Profile</button>
                </div>
              </div>
              <div className='flex justify-evenly py-3'>
                <a className='text-pink-600' href={developer.socialLinks}><i className="fab fa-instagram"></i></a>
                <a className='text-blue-600' href={developer.socialLinks}><i className="fab fa-facebook"></i></a>
                <a className='text-black' href={developer.socialLinks}><i className="fab fa-x-twitter"></i></a>
                <a className='text-blue-700' href={developer.socialLinks}><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          ))}
        </div>
      )}

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
