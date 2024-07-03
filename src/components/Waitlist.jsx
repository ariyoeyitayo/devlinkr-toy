import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, collection, addDoc } from '../firebase';  // Ensure this path is correct

function Waitlist() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(''); // 'success', 'error', ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await addDoc(collection(db, 'waitlist'), {
        fullName,
        email
      });
      setFullName('');
      setEmail('');
      setStatus('success');
      setTimeout(() => setStatus(''), 3000); // Reset status after 3 seconds
    } catch (error) {
      console.error('Error adding document: ', error.message); // Log the error message
      setStatus('error');
      setTimeout(() => setStatus(''), 3000); // Reset status after 3 seconds
    }
    setLoading(false);
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <header className="p-6 flex justify-between">
        <h1 className="text-2xl font-bold">devlinkr.</h1>
        <Link to="/" className='text-[16px] text-black flex'>Home <i className="fa p-1 fa-arrow-right"></i></Link>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          meet, learn, connect and<br />
          grow with the tech<br />
          community
        </h2>
        
        <p className="mb-8">
          join our waitlist<br />
          to know when we launch
        </p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="full name..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white border border-black rounded-md p-3 mb-4 text-black placeholder-gray-400"
            required
          />
          
          <input
            type="email"
            placeholder="email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-black rounded-md p-3 mb-4 text-black placeholder-gray-400"
            required
          />
          
          <button
            type="submit"
            className={`w-full font-bold py-3 rounded-md flex items-center justify-center
              ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-black'}
              text-white`}
            disabled={loading}
          >
            {loading ? (
              <div className="loader-waitlist"></div>
            ) : status === 'success' ? (
              <span className="text-white">✔️</span>
            ) : status === 'error' ? (
              <span className="text-white">Failed to submit</span>
            ) : (
              <>
                submit
                <span className="ml-2">→</span>
              </>
            )}
          </button>
        </form>
      </main>
      
      <footer className="p-6 flex justify-center space-x-4">
        <a target='_blank' href="https://www.instagram.com/therealteejay24/" className="text-black"><i className="fab fa-instagram"></i></a>
        <a target='_blank' href="https://x.com/ariyo_eyitayo" className="text-black"><i className="fab fa-x-twitter"></i></a>
      </footer>
    </div>
  );
}

export default Waitlist;
