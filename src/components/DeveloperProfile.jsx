import React from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

function DeveloperProfile({ developers }) {
  const { id } = useParams();
  const developer = developers.find(dev => dev.id === id);

  if (!developer) {
    return <div className="text-white">Developer not found</div>;
  }

  return (
    <div className="developer-profile bg-gray-900 text-white p-6">
      <div className="flex flex-col md:flex-row items-center border-b border-gray-700 pb-6 mb-6">
        {developer.img && developer.img.url ? (
          <img
            src={developer.img.url}
            alt={`${developer.firstName} ${developer.lastName}`}
            className="w-16 h-16 rounded-full mr-4"
          />
        ) : (
          <div className="w-16 h-16 rounded-full mr-4 bg-gray-700"></div>
        )}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-semibold">{developer.firstName} {developer.lastName}</h1>
          <p className="text-gray-400">{developer.longBio || 'Product Designer'}</p>
          <p className="text-gray-400">{developer.location}</p>
        </div>
      </div>

      <div className="border border-gray-700 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">First Name</p>
            <p>{developer.firstName}</p>
          </div>
          <div>
            <p className="text-gray-400">Last Name</p>
            <p>{developer.lastName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email address</p>
            <p>{developer.email || 'jackadams@gmail.com'}</p>
          </div>
          <div>
            <p className="text-gray-400">Phone</p>
            <p>{developer.phone}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400">Bio</p>
            <p>{developer.longBio}</p>
          </div>
        </div>
      </div>

      <div className="border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Country</p>
            <p>{developer.country || 'United States of America'}</p>
          </div>
          <div>
            <p className="text-gray-400">City/State</p>
            <p>{developer.city || 'California, USA'}</p>
          </div>
          <div>
            <p className="text-gray-400">Postal Code</p>
            <p>{developer.postalCode || 'EAT 62574'}</p>
          </div>
          <div>
            <p className="text-gray-400">TAX ID</p>
            <p>{developer.taxId || 'AS564178969'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperProfile;
