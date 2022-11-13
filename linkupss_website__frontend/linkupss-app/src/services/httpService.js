import axios from "axios";
import { toast } from "react-toastify";

//import * as Sentry from "@sentry/react";
//axios.defaults.headers.common['x-auth-token'] = getJwt();//get rid of bidirectional dependency
axios.interceptors.response.use(null, (error) => {
  console.log("INTERCEPTOR CALLED");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (!expectedError) {
    console.log(error);
    toast.error("An unexpected error occured");
  }
  return Promise.reject(error);
}); //calls success() when response is received successfully,error() when unexpected error occurs
axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('userToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
   else delete axios.defaults.headers.common["Authorization"];
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete.apply,
};
