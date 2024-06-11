/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-09 15:20:45
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-09 15:22:05
 * @FilePath: /front-end/src/api/admin.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";

const token = localStorage.getItem("token");
const API_URL = "http://localhost:3000";
const config = {
    headers: {
      Authorization: token,
    },
  };

/* 为什么是put，不应该是get吗 */
const getAllUser = (body)=> { 
    return axios.put(API_URL +"/api/admin/getAllUser", body, config);
}

const setAdmin = (email, body)=> { 
  return axios.put(API_URL +"/api/admin/usersetadmin/"+ email, body, config);
}

const cancelAdmin = (email, body)=> { 
  return axios.put(API_URL +"/api/admin/usercanceladmin/"+ email, body, config);
}

const enableUser = (email, body)=> { 
  return axios.put(API_URL +"/api/admin/userenable/"+ email, body, config);
}

const disableUser = (email, body)=> { 
  return axios.put(API_URL +"/api/admin/userdisable/"+ email, body, config);
}

const getAllReview = ()=> { 
  return axios.get(API_URL +"/api/admin/getAllReview", config);
}

const getpolicy = (policy)=> { 
  return axios.get(API_URL +"/api/policy/get-policy?type="+ policy, config);
}

const updatepolicy = (body) =>{
  return axios.post(API_URL +"/api/policy/update-policy", body, config);
}

const hideReview = (body)=> { 
  return axios.put(API_URL +"/api/admin/hideReview", body, config);
}

export {getAllUser, setAdmin, cancelAdmin, enableUser, disableUser, getAllReview, getpolicy, updatepolicy, hideReview };
