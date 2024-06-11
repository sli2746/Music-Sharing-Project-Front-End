import React, {useState} from 'react'
import { createlist } from "../api/list";

const user = localStorage.getItem("userName") ;
         
//create a new list
function CreateList({Creating, error}){
    const [details, setDetails] = useState({listname:"", descr:"", /* tracks:"", */ visibility:""});
    const createHandler = err =>{
        err.preventDefault();
        Creating(details);

        const handelCreate = () => {
            createlist({list_name:details.listname, description:details.descr, visibility:details.visibility, creator:user })
            .then((res) => {
                console.log(res.data);
                alert("create successful, refresh the page to load lists again")
                })
            .catch((error) => {
                console.log(error)
            });
        }
        handelCreate();
        
        //refresh the updated list and ask for re-render
        this.setState({ state: this.state }) 

    } 

    return (
        <div className='authprev'>
            <h3> Would you like to create a new list?</h3>
            <div className='createLists'>
                <form onSubmit={createHandler}>
                <label>List name:
                    <input id="listname" type="text" maxlength="20" name="listname" onChange={err => setDetails({...details, listname: err.target.value})} value ={details.listname}/>
                </label>
                <label>Description:
                    <input id="descr" type="text" name="descr" maxlength="50" onChange={err => setDetails({...details, descr: err.target.value})} value ={details.descr}/>
                </label>
                <label>Visibility:
                    <select id="visibility" name="visibility" onChange={err => setDetails({...details, visibility: err.target.value})} value ={details.visibility}>
                        <option value="false">select:</option>
                        <option value="false">Private</option>
                        <option value="true">Public</option>
                    </select>
                </label>
                <input type="submit" value='create' />
                </form>
            </div>

            <div className="update">

            </div>
        </div>
    )
 }


export default CreateList;
