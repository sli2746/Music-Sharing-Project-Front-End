/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-06 17:01:03
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-09 14:16:16
 * @FilePath: /front-end/src/components/unauthenUserSection.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState} from 'react'
import UnauthenUserPortal from './unauSearchInput'
import UnauthenUserPortal2 from './unauSearchResult'

function UnauthenUserSection(){
    // const [inputs, setInputs] = useState("");
    //const [user,setUser] =  useState({inputArtist:"", inputBand:"",inputGenre:"", inputTrackTitle:""});
    const [errors, setError]= useState(""); 
    const Searching = details => {
        console.log(details)
    }
    const SortingResult = sortdetails => {
        console.log(sortdetails)
    }
    
    return (
        <div className='normal_form'>
            
            {/* <UnauthenUserPortal Searching={Searching} error ={errors} /> */}
            <UnauthenUserPortal2 SortingResult={SortingResult} error ={errors}/>
        </div>
    )
 }
export default UnauthenUserSection;