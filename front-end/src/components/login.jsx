import React, {useState} from 'react'
import LoginPortal from './loginportal'
/* use auth0, watch youtube video */

function Login(){
    // const [inputs, setInputs] = useState("");
    const [user,setUser] =  useState({name:"", password:""});
    const [errors, setError]= useState(""); 
    const handleSubmit = info => {
        alert("all is", info)   
    }
    const Logining = details => {
        console.log(details)
    }
    return (
        <div className='normal_form'>
            {(user.name !=="") ? 
            (<div className='loggedin'>
                <h2>Welcome, <span>{user.name}</span></h2>
             </div>)
            :
            (<LoginPortal Logining={Logining} error ={errors} />)
            }
        </div>
    )
 }
export default Login;