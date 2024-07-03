import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (subscribed) {
      const timer = setTimeout(() => {
        setSubscribed(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [subscribed]);

  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
      setError('');
    }, 2000);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <footer className="bg-white py-8 px-4 border-t border-gray-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-[30px] font-bold mb-4 flex items-center text-gray-800">
              devlinkr.
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Connecting you with the tech space.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`border rounded-l px-3 py-2 w-64 outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}
              />
              <button
                className={`${
                  subscribed ? 'bg-green-500' : 'bg-gray-500'
                } text-white px-4 py-2 rounded-r`}
                onClick={handleSubscribe}
                disabled={subscribed || loading}
              >
                {loading ? (
                  <span className="loader-btn"></span>
                ) : subscribed ? (
                  '✓'
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
        
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2024 Copyright Devlinkr</p>
          
          <div className="flex space-x-4">
            <a target='_blank' href="https://www.instagram.com/therealteejay24/" className="text-gray-500 hover:text-gray-800"><i className="fab fa-instagram"></i></a>
            <a target='_blank' href="https://web.facebook.com/ariyoeyitayo" className="text-gray-500 hover:text-gray-800"><i className="fab fa-facebook"></i></a>
            <a target='_blank' href="https://x.com/ariyo_eyitayo" className="text-gray-500 hover:text-gray-800"><i className="fab fa-x-twitter"></i></a>
            <a target='_blank' href="www.linkedin.com/in/ariyoeyitayo" className="text-gray-500 hover:text-gray-800"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
