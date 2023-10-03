import axios from "axios";
import BASE_URL from "../settings.json";

axios.defaults.withCredentials = true;

const userLogin = async (data) => {
  const result = await axios({
    method: "POST",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    url: `${BASE_URL.BASE_URL}/api/login`,
    data: data,
  });

  return result;
};

const userSignup = async (data) => {
  const result = await axios({
    method: "POST",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    url: `${BASE_URL.BASE_URL}/api/signup`,
    data: data,
  });
  return result;
};

const getUserDetails = async () => {
  const result = await axios({
    method: "GET",
    withCredentials: true,
    url: `${BASE_URL.BASE_URL}/api/user`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
  });
  return result;
};

const generateRefreshToken = async () => {
  const result = await axios({
    method: "GET",
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    },
    url: `${BASE_URL.BASE_URL}/api/refresh`,
  });
  return result;
};

const logOutUser = async () => {
  const result = await axios({
    method: "POST",
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    },
    url: `${BASE_URL.BASE_URL}/api/logout`,
  });
  return result;
}

export { userLogin, userSignup, getUserDetails, generateRefreshToken, logOutUser };
