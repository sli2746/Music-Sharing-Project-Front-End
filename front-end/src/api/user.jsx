/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-11-30 15:37:23
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-11 10:37:06
 * @FilePath: /front-end/src/api/user.js
 */
import axios from "axios";
const token = localStorage.getItem("token");

const API_URL = "http://localhost:3000";
const config = {
  headers: {
    Authorization: token,
  },
};
const login = (body) => {
  return axios.post(API_URL + "/api/auth", body,config);
};

//not sure which portal
const signup = (body) => {
  return axios.post(API_URL + "/api/users", body,config);
};

const googleLogin = (body) => {
  return axios.post(API_URL + "/api/auth/googleLogin", body);
};
const changePassword = (body) => {
  return axios.post(API_URL + "/api/users/changePassword", body);
};

const getPolicy = (type) => {
  return axios.get(API_URL + "/api/policy/get-policy?type="+type);
};

export {login, signup,googleLogin,changePassword,getPolicy};
