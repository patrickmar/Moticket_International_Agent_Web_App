import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userActions } from '../store/reducers/userReducers';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Dispatch function from Redux
  const [credentials, setCredentials] = useState({
    userid: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://moloyal.com/test/mosave/script/api/agent/login',
        credentials
      );
      localStorage.setItem('userData', JSON.stringify(response.data)); // Store user data in local storage

      if (response.data.error) {
        throw new Error(response.data.message || 'An error occurred');
        toast.error(response.data.message);
      }
      // Dispatch action to store user info in Redux store
      dispatch(userActions.setUserInfo(response.data));
      // Store user data in local storage
      localStorage.setItem('userData', JSON.stringify(response.data));
      // Notify user about successful login
      toast.success('Login successful');
      // Handle successful login, navigate to '/verify' page
      navigate('/verify');
      console.log(response.data);
    } catch (error) {
      setError(error.message || 'An error occurred');
      // Notify user about login error
      toast.error('Login failed: ' + error.message);
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="number"
              name="userid"
              placeholder="Phone number"
              value={credentials.userid}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border-none bg-transparent outline-none placeholder-italic focus:outline-none"
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <button
            type="submit"
            className="transform rounded-sm bg-indigo-600  font-bold duration-300 hover:bg-indigo-400 flex justify-center mx-auto px-6 py-2"
          >
            LOG IN
          </button>
        </form>

        <p className="text-center text-lg">
          Don't have an account?
          <Link
            to="/register"
            className="font-medium text-indigo-500 underline-offset-4 hover:underline"
          >
            Register
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
