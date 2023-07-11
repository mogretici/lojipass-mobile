import axios from "axios";
const apiUrl = "https://lojipass.onrender.com/api/";

export const LoginUser = async (input) => {
  const { data } = await axios.post(`${apiUrl}auth`, input);
  return data;
};

export const RegisterUser = async (input) => {
  const { data } = await axios.post(`${apiUrl}register`, input);
  return data;
};
