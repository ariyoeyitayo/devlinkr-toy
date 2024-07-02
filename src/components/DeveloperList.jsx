import React from 'react';

function DeveloperList({ developers, onSelectDeveloper }) {
  if (!developers) {
    return <div>Loading developers...</div>;
  }

  if (developers.length === 0) {
    return <div>No developers found.</div>;
  }

  return (
    <div className="developer-list text-white">
      {developers.map((developer, index) => (
        <div key={index} className="developer-item" onClick={() => onSelectDeveloper(developer)}>
<div className='flex'>
<img className='h-[100px] rounded-[100%]' src={developer.img.url} alt="" />
<div className='pl-4 py-6'>
<h2 className='text-xl'>{developer.firstName} {developer.lastName}</h2>
<p className=''>{developer.devStatus}</p>
</div>
</div>
          <p className='bio'>{developer.shortBio}</p>
          <a href={developer.socialLinks.link1}><i className="fa-brands fa-instagram"></i></a>
          <a href={developer.socialLinks.link3}><i className="fa-brands fa-github"></i></a>
        </div>
      ))}
    </div>
  );
}

export default DeveloperList;
