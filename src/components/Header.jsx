import React from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/user';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogoClick = () => {
    if (userState.userInfo) {
      // User is logged in, navigate to home page
      navigate('/verify');
    } else {
      // User is not logged in, navigate to login page
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            {/* Call handleLogoClick on logo click */}
            <Link className="flex items-center" onClick={handleLogoClick}>
              <img className="h-7 w-auto" src={logo} alt="" />
            </Link>
          </div>

          {userState.userInfo ? (
            <div className="flex items-center justify-end gap-3">
              <button
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              {/* Use 'to' prop for login link */}
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                to="/"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
