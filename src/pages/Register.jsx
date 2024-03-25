import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signup } from '../services/index/users';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ firstname, lastname, email, password, agentphone }) => {
      return signup({ firstname, lastname, email, password, agentphone });
    },
    onSuccess: (data) => {
      toast.success('User registered successfully');
      // dispatch(userActions.setUserInfo(data));
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate('/');
    }
  }, [userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      agentphone: '',
    },
    mode: 'onChange',
  });

  const submitHandler = (data) => {
    const { firstname, lastname, email, password, agentphone } = data;
    mutate({ firstname, lastname, email, password, agentphone });
  };

  return (
    <section className="flex flex-col items-center pt-6 mt-24">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div>
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Emelia "
                {...register('firstname', {
                  minLength: {
                    value: 1,
                    message: 'Name length must be at least 1 character',
                  },
                  required: {
                    value: true,
                    message: 'Firstname is required',
                  },
                })}
                error={!!errors?.firstname}
              />
              <p className="text-red-500">
                {errors?.firstname ? errors.firstname.message : null}
              </p>
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Erickson"
                {...register('lastname', {
                  minLength: {
                    value: 1,
                    message: 'lastname length must be at least 1 character',
                  },
                  required: {
                    value: true,
                    message: 'lastname is required',
                  },
                })}
                error={!!errors?.lastname}
              />
              <p className="text-red-500">
                {errors?.lastname ? errors.lastname.message : null}
              </p>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="emelia_erickson24@gmail.com"
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid email',
                  },
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                })}
                error={!!errors?.email}
              />
              <p className="text-red-500">
                {errors?.email ? errors.email.message : null}
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Password length must be at least 6 characters',
                  },
                })}
                error={!!errors?.password}
              />
              <p className="text-red-500">
                {errors?.password ? errors.password.message : null}
              </p>
            </div>
            <div>
              <label
                htmlFor="agentphone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="number"
                name="agentphone"
                id="agentphone"
                placeholder="9048595930"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('agentphone', {
                  required: {
                    value: true,
                    message: 'Agentphone is required',
                  },
                  minLength: {
                    value: 10,
                    message: 'Incorrect phone number',
                  },
                  maxLength: {
                    value: 13,
                    message: 'Incorrect phnone number',
                  },
                })}
                error={!!errors?.agentphone}
              />
              <p className="text-red-500">
                {errors?.agentphone ? errors.agentphone.message : null}
              </p>
            </div>
            <button
              type="submit"
              className="disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={!isValid || isLoading}
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                to="/login"
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
