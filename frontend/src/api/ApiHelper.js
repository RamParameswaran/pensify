// Wrapper function that can be used to make API calls
// Author: Ram Parameswaran
// Date 31/03/2020

import config from "../config";
import axios from "axios";
import env from "config/env";

axios.defaults.withCredentials = false;

const client = axios.create({
  baseURL: config.API_BASE_URL,
});

const ApiHelper = function (options) {
  const onSuccess = function (response) {
    // console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = function (error) {
    if (env.mode === "dev") {
      // console.error("Request Failed:", error.config);
    }

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      if (env.mode === "dev") {
        // console.error("Status:", error.response.status);
        // console.error("Data:", error.response.data);
        // console.error("Headers:", error.response.headers);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      if (env.mode === "dev") {
        // console.error("Error Message:", error.message);
      }
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default ApiHelper;
