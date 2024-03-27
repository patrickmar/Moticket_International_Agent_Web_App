import axios from 'axios';
const baseURL=process.env.REACT_APP_BASE_URL;

// const BaseUrl = process.env.BASEURL;
export const signup = async ({
  firstname,
  lastname,
  email,
  password,
  agentphone,
}) => {
  try {

   
    const { data } = await axios.post(
      `${baseURL}/agent/register`,
      {
        firstname,
        lastname,
        email,
        password,
        agentphone,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ userid, password }) => {
  try {
    const { data } = await axios.post(
      `${baseURL}/agent/login`,
      {
        userid,
        password,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
