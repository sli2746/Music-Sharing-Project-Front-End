import React, { Component } from 'react';
import Login from './login';

export default class Start extends Component {
  render() {

    return (
      <div>
         <h1 id="app-name"> Welcome to Song Finder</h1>
         <Login></Login>
         <div>
            <p>Here is a website that you can search songs and related information like lyrics, artists, and album. <br/>
              You can also create and modify your favourite song lists.  <br/>
              Try the functions below and log in if you wanna access more functionalities.  <br/>
              Enjoy! </p>
         </div>

       
      </div>
    )
  }
}