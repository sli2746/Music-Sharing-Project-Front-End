import axios from "axios";

const token = localStorage.getItem("token");
const username = localStorage.getItem("userName");

const API_URL = "http://localhost:3000";
const config = {
    headers: {
      Authorization: token,
    },
  };

const createlist = (body)=>{
    return axios.post(API_URL +"/api/lists/create-list", body, config);
}

const deletelist = (body)=>{
  return axios.post(API_URL +"/api/lists/delete-byName", body, config);
}
  
const showlist = () => {
    return axios.get(API_URL + "/api/lists/getAllList", config);
};

const authgetlist = () => {
  return axios.get(API_URL + "/api/lists/getListByUser?userName="+username, config);
};

const addRevewToList = (body) => {
  return axios.post(API_URL + "/api/lists/addReview",body, config);
};

const editList = (body) => {
  return axios.post(API_URL + "/api/lists/editList",body, config);
};

const removeTrackInList = (body) => {
  return axios.post(API_URL + "/api/lists/removeTrack",body, config);
};

export {createlist, deletelist, showlist, addRevewToList, authgetlist, editList, removeTrackInList};
