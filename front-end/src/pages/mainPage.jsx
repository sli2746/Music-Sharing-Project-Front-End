/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-07 15:22:18
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-09 14:15:48
 * @FilePath: /front-end/src/pages/mainPage.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import Login from '../components/login'
import UnauthenUserSection from '../components/unauthenUserSection';
import AuthenUserSection from '../components/authenUserSection';



export default class MainPage extends Component {
  render() {

    return (
      <div>
         <h1 id="app-name"> Welcome to Song Finder</h1>
         <Login></Login>
         <a href="/signup">go to signup</a>
         <div>
            <p>Here is a website that you can search songs and related information like lyrics, artists, and album. <br/>
              You can also create and modify your favourite song lists.  <br/>
              Try the functions below and log in if you wanna access more functionalities.  <br/>
              Enjoy! </p>
         </div>
         <UnauthenUserSection></UnauthenUserSection>
         <AuthenUserSection></AuthenUserSection>
       

       
      </div>
    )
  }
}