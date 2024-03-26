// HomePage.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BaseUrl = process.env.BASEURL;
const HomePage = () => {
  const userState = useSelector((state) => state.user);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (index, value) => {
    const updatedCode =
      verificationCode.substring(0, index) +
      value +
      verificationCode.substring(index + 1);
    setVerificationCode(updatedCode);
  };

  // HomePage.js
  const handleVerifyPurchase = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const response = await fetch(
        `https://moloyal.com/test/mosave/script/api/agent/geteventticket/${verificationCode}`
      );
      const data = await response.json();
      console.log('Response data:', data);
      if (!data.error && data.title) {
        navigate('/event-details', { state: { ticketDetails: data } });
      } else {
        console.error('Invalid data received:', data);
      }
    } catch (error) {
      console.error('Error verifying purchase:', error);
    } finally {
      setIsLoading(false); // Reset loading state to false
    }
  };

  // Check if user is logged in, if not, display a message or redirect
  if (!userState.userInfo) {
    return (
      <div className="flex justify-center mt-72 font-semibold text-red-500 text-lg">
        Please log in to access this page.
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Enter the ticket reference</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Kindly verify purchase</p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap justify-center gap-1">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="">
                  <input
                    className="md:w-12 md:h-12 w-8 h-8 mb-4 px-1 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name={`input-${index}`}
                    id={`input-${index}`}
                    value={verificationCode[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button
                  className="w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm"
                  onClick={handleVerifyPurchase}
                  disabled={isLoading} // Disable button when loading
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c2.485 0 4.746-.896 6.5-2.386l-3-5.196A7.947 7.947 0 0112 20zm6.5-9.614A7.962 7.962 0 0120 12h-4c0 2.083.803 3.98 2.117 5.414l3-2.647zM12 4c-2.485 0-4.746.896-6.5 2.386l3 5.196A7.947 7.947 0 0112 4z"
                      ></path>
                    </svg>
                  ) : (
                    'Verify Purchase'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
