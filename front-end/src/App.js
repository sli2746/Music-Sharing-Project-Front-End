/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-05 19:18:10
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-05 19:19:39
 * @FilePath: /front-end/src/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './App.css';
import MainPage from './pages/mainPage';
import { Routes, RouterProvider } from 'react-router-dom';
import router from './router/router';
//this is dev branch
function App() {
  
  return (
    <div className="App">
      {/* <MainPage></MainPage> */}
      <RouterProvider router = {router}></RouterProvider>
    </div>
    
  );
}

export default App;
