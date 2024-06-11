import React, {useState} from 'react'
import SignUp from '../components/signupPortal'

function SignupPage(){
    const [errors, setError]= useState(""); 
    const Signupft = details => {
        console.log(details)
    }

    return (
      <div>
        <SignUp Signupft={Signupft} error ={errors} />
      </div>
    )
 }


export default SignupPage;