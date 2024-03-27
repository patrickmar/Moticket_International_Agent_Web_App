import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import ValidationResponse from './ValidationResponse';
import { useSelector } from 'react-redux';

const EventDetails = () => {
  const location = useLocation();
  const ticketDetails = location.state ? location.state.ticketDetails : null;
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [validationResponse, setValidationResponse] = useState(null); // State to hold validation response

  const baseURL = process.env.REACT_APP_BASE_URL;

  const userState = useSelector((state) => state.user);
  // const agentid = userState.userInfo.id;

  // console.log(agentid);
  // Function to handle validation of ticket
  const handleValidation = async () => {
    // const userState = useSelector((state) => state.user);
    setIsLoading(true);
    try {
      // Extract the ticketid from the ticketDetails
      const ticketId = ticketDetails.ticketid;

      // Prepare the request body
      const requestBody = {
        ticketid: ticketId,
        // agentid: agentid,
      };

      // Perform the validation using the API endpoint
      const response = await fetch(`${baseURL}/agent/processeventticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Parse the response
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setValidationResponse(data); // Set the validation response
      }
    } catch (error) {
      console.error('Error validating ticket:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if ticketDetails is undefined or null
  if (!ticketDetails) {
    return (
      <div>
        <div className="flex justify-center  mt-32 text-[#c10006] font-bold text-lg">
          No ticket details available <br />
          <Link className="text-[#25aae1] underline" to={'/verify'}>
            Verify Another Ticket
          </Link>
        </div>
      </div>
    );
  }

  if (validationResponse) {
    return <ValidationResponse message={validationResponse.message} />;
  }

  if (!userState.userInfo) {
    return (
      <div className="flex justify-center mt-72 font-semibold text-red-500 text-lg">
        Please log in to access this page.
      </div>
    );
  }
  // Access the title property
  return (
    <section className="container md:px-12 px-4">
      <div className="bg-white overflow-hidden shadow rounded-lg border mt-32">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Event Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-[#c10006] font-semibold capitalize-first">
            {ticketDetails.message}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Event Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketDetails.title}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketDetails.fname}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketDetails.lname}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ticket ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketDetails.ticketid}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Ticket Class
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {ticketDetails.ticket_class}
              </dd>
            </div>
            {ticketDetails.status !== '0' && ( // Conditionally render if status is not equal to 0
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Used On</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticketDetails.used_date_time}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      {ticketDetails.status === '0' ? (
        <button
          className={`text-white px-6 py-2 mt-8 flex justify-center items-center rounded-lg mx-auto ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#25aae1]'
          }`}
          onClick={handleValidation}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Validating Ticket...' : 'Validate Ticket'}
        </button>
      ) : (
        <Link
          className="flex justify-center items-center text-[#25aae1] mt-8 "
          to={'/verify'}
        >
          <IoArrowBackCircleOutline className="w-8 h-8 mr-8" />
          Verify Another Ticket
        </Link>
      )}
      <Link className="text-[#c10006] flex " to={'/verify'}>
        <IoArrowBackCircleOutline className="w-8 h-8 mr-4" />
        Back
      </Link>
    </section>
  );
};

export default EventDetails;
