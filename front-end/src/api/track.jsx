/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-07 15:22:18
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-08 16:09:47
 * @FilePath: /front-end/src/api/track.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%
 */
import axios from "axios";

const token = localStorage.getItem("token");
const API_URL = "http://localhost:3000";
const config = {
  headers: {
    Authorization: token,
  },
};

const gettrackinfo = (body) => {
  return axios.get(API_URL + "/api/track/getTrackByTitle", body, config);
};

const getTrackByName = (trackTitle) => {
  return axios.get(
    API_URL + "/api/track/get-tracks-title?" + "trackTitle=" + trackTitle,
    config
  );
};

const getTrackByArtist = (artistName) => {
  return axios.get(
    API_URL + "/api/track/get-tracksByArtist?" + "artistName=" + artistName,
    config
  );
};

const addTrackToList = (body) => {
  return axios.post(API_URL + "/api/track/save-tracks-toList", body, config);
};

export { gettrackinfo, getTrackByName, getTrackByArtist,addTrackToList };
