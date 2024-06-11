import React, {useState}  from 'react'
import { signup } from "../api/user";



function SignupPortal({Signupft, error}){
    const [details, setDetails] = useState({firstname:"",lastname:"", password:"", email:""});
    const submitHandler = err =>{
        err.preventDefault();
        Signupft(details);

        const handleSingup =()=> {
            //not sure how backend's first name and lastname defined
            signup({firstName:details.name, lastName:details.lastname, email:details.email, password:details.password})
              .then((res) => {
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error)}
                );
        };
        
        handleSingup();
    }

    return(
        <div className='normal_form'>  
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
                <label> First Name:
                <input id="firstname" type="text" name="firstname" onChange={err => setDetails({...details, firstname: err.target.value})} value ={details.firstname}/>
                </label>
                <label> Last Name:
                <input id="lastname" type="text" name="lastname" onChange={err => setDetails({...details, lastname: err.target.value})} value ={details.lastname}/>
                </label>
                <label> Password:
                <input id="password" type="text" name="password" onChange={err => setDetails({...details, password: err.target.value})} value ={details.password}/>
                </label>
                <label> Email:
                <input id="email" type="text" name="email" onChange={err => setDetails({...details, email: err.target.value})} value ={details.email}/>
                </label>
                <input type="submit" />
            </form> 
            <a href="/">back to signin</a> 
        </div>
    )
}
export default SignupPortal;