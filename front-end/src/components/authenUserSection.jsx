/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-08 16:29:23
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-09 15:32:40
 * @FilePath: /front-end/src/components/authenUserSection.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState} from 'react'
import CreateList from './createlist'
import ShowLists from './aushowlists'

function AuthenUserSection(){
    const [errors, setError]= useState(""); 
    const [loginState,setLoginState] = useState(""); 

    const Creating = details => {
        console.log(details)
    }
    return (
        <div className='normal_form' >
            <CreateList Creating={Creating} error ={errors} />
            <div className= "showLists">
                {<ShowLists />}
            </div>
        </div>
    )
 }

export default AuthenUserSection;