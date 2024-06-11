/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-06 17:01:23
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-08 22:27:10
 * @FilePath: /front-end/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.render(
  <GoogleOAuthProvider clientId="471902275069-9d7ilptsmimfdhl0l7m1678on2jrrq8k.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
