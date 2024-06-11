/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-05 19:18:10
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-07 15:55:58
 * @FilePath: /front-end/src/router/router.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import React, { Component } from 'react';
import SignupPage from "../pages/Signup";
import SigninPage from "../pages/SignIn";
import MainPage from "../pages/mainPage";
import HomePage from "../pages/Home";
import AdministratorPage from "../pages/administratorPage";
import DMCAPage from "../pages/dmcaPage";
import AUPPage from "../pages/aupPage";
import PrivacyPolicyPage from "../pages/privacyPolicyPage";


const router = createBrowserRouter([
    
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/admin",
          element: <AdministratorPage />,
        },
        {
          path: "/signin",
          element: <SigninPage />,
        },
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/dmca",
          element: <DMCAPage />,
        },
        {
          path: "/aup",
          element: <AUPPage />,
        },
        {
          path: "/privacypolicy",
          element: <PrivacyPolicyPage />,
        }
    
  ]);

export default router;

  