// ValidationResponse.js
import React from 'react';
import { Link } from 'react-router-dom';

const ValidationResponse = ({ message }) => {
  return (
    <div>
      <div className="flex justify-center mx-auto mt-32">
        <div className="bg-white overflow-hidden shadow rounded-lg border p-6">
          <h1 className="text-xl font-bold mb-4">Validation Response</h1>
          <p className="mb-12">{message}</p>
          <Link
            to={'/verify'}
            className="text-white bg-[#25aae1] px-6 py-2  mt-12 rounded-lg"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValidationResponse;
