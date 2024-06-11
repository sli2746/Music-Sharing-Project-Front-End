import React, {useState, useEffect} from 'react'
import Collapsible from 'react-collapsible';
import {authgetlist, deletelist,addRevewToList, editList, removeTrackInList} from "../api/list";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';


const username = localStorage.getItem("userName") ;

function ShowLists(){
    const [fetched, setfetched] = useState(null);
    const [open, setOpen] = useState(false);
    const [oldinfo, setoldinfo] = useState(null);
    const [newinfo, setnewinfo] = useState({newname:"", newdescr:"", newvisibility:""});

    //refresh the 
    useEffect(()=>{
        authgetlist()
            .then((res)=>{
                setfetched(res.data.lists)
            })
            .catch((error)=>console.log(error));
    },[]);
    console.log("fetched auth", fetched)

    function addReview(review, listname){
        console.log(listname);
        //get all input field values and remove empty strings
        var vals=[];
        for(var i=0;i<review.length;i++){
            vals.push(review[i].value);
        }
        const reviewValue = vals.filter(element => {
            return element !== '';
        });
        var addNewReview = reviewValue[0];
        console.log(addNewReview);

        addRevewToList({listName: listname, userName:username, review:addNewReview})
        .then((res) => {
            console.log("add review complete")
            alert("Review added, please refresh the page.")
            console.log(res.data);
            })
        .catch((error) => {
            console.log("add review failed")
            console.log(error)
        }
        );

        //refresh the updated list and ask for re-render
/*         authgetlist()
        .then((res)=>{
            setfetched(res.data.lists)
        })  
        .catch((error)=>console.log(error));
        console.log("refreshed auth", fetched) */
        this.setState({ state: this.state })
    };

    //for edit all-aspects of list (open edit window)
    const handleClickOpen = (name,description,visibility) => {
        setOpen(true);
        console.log("params are ", name,description,visibility)
        setoldinfo({name:name, description: description, visibility:visibility})
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    
    //make changes to the list
    const updateList = () => {
/*         console.log("old list info", oldinfo)
        console.log("new list info", newinfo) */
        let updateinfo ={old_listName:oldinfo.name, new_listName:"", description:"", visibility:""}
        newinfo.newname ? updateinfo.new_listName = newinfo.newname : updateinfo.new_listName = oldinfo.name;
        newinfo.newdescr ? updateinfo.description = newinfo.newdescr : updateinfo.description = oldinfo.description;
        newinfo.newvisibility ? updateinfo.visibility = vis2bool(newinfo.newvisibility) : updateinfo.visibility = oldinfo.visibility;
        // console.log("updated should be ", updateinfo)
        editList(updateinfo)
        .then((res) => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error)
        });
        setOpen(false);

        //refresh the updated list and ask for re-render
        authgetlist()
        .then((res)=>{
            setfetched(res.data.lists)
        })  
        .catch((error)=>console.log(error));
        console.log("refreshed auth", fetched)
        this.setState({ state: this.state })  
    };

// remove track from list
    function removeTrackfromList(list_name, track_id){
        console.log("remove ", track_id, "from ", list_name)
        removeTrackInList({listName:list_name, track_id: track_id})
        .then((res) => {
            console.log("removed", res.data);
            alert("updated, refresh to see results")
            })
        .catch((error) => {
            console.log(error)
        });
    };

    //confirmation delete diaglog
/*     const [Deleteopen, setDeleteOpen] = React.useState(false);
    const handleClickDeleteOpen = () => {
      setDeleteOpen(true);
    };
    const handleDeleteClose = (confirm, childName) => {
        if (confirm == 1){
            console.log("delete it ")
            DeleteList(childName)
        }
        console.log("keep it ")
      setDeleteOpen(false);
    };
 */
// delete an unwanted list
    function DeleteList(childName){
        console.log("delete this", childName);
        
        console.log(fetched[0].list_name);
        for( var i = 0; i < fetched.length; i++){ 
            if ( fetched[i].list_name === childName) {  
                fetched.splice(i, 1); 
            }    
        }
        deletelist({listName:childName})
        .then((res) => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error)
        });

        //refresh the updated list and ask for re-render
        authgetlist()
        .then((res)=>{
            setfetched(res.data.lists)
        })  
        .catch((error)=>console.log(error));
        console.log("refreshed auth", fetched)
        this.setState({ state: this.state })  
    }
    // change boolean value on page
    function bool2vis(boo){
        if (boo ===true){return "public"}
        else { return "private"}
    } 
    function vis2bool(boo){
        if (boo ==="public"){return true}
        else { return false}
    } 

    return (
        <div className='show20lists'> 
        <h3>Show your lists:</h3>
            <ul> 
                {fetched && fetched.map((child) =>
                    <li key={child.list_name}>
                        <div className='list'>
                            <Collapsible trigger = {"List name : " + [child.list_name] +",    Description: " + [child.description] + ",    Visibility: "+ [bool2vis(child.visibility)] }>
                                <Button size="small" variant="text" onClick={()=>handleClickOpen(child.list_name, child.description, child.visibility)}> Edit</Button>
                                <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>Edit Your List</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>New List Name:</DialogContentText>
                                            <TextField autoFocus margin="dense" label="name" type="text" variant="standard" placeholder="new name for your list"
                                                onChange={(err) => setnewinfo({...setnewinfo, newname: err.target.value })}/>
                                        </DialogContent>
                                        <DialogContent>
                                            <DialogContentText>New List Description:</DialogContentText>
                                            <TextField autoFocus margin="dense"  label="description" type="text" variant="standard" placeholder="new description for your track"
                                                onChange={(err) => setnewinfo({...newinfo, newdescr: err.target.value })}/>
                                        </DialogContent>
                                        <DialogContent>
                                            <DialogContentText>Change Visibility:</DialogContentText>
                                            <TextField autoFocus margin="dense" label="visibility" type="text" variant="standard" placeholder="either public or private"
                                                onChange={(err) => setnewinfo({...newinfo, newvisibility: err.target.value })}/>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={()=>updateList()}>Save</Button>
                                        </DialogActions>
                                    </Dialog>
                             {/*    <Button size="small" variant="text" onClick={handleClickDeleteOpen}>Delete </Button>
                                <Dialog open={Deleteopen} onClose={handleDeleteClose(0, child.list_name)}>
                                <DialogTitle> {"Please confirm if you are deleting this track"} </DialogTitle>
                                <DialogActions>
                                    <Button onClick={()=>handleDeleteClose(1,child.list_name)}>Yes</Button>
                                    <Button onClick={()=>handleDeleteClose(0,child.list_name)} autoFocus> No </Button>
                                </DialogActions>
                                </Dialog>
      >      */}
                                <Button size="small" variant="text" onClick={() => DeleteList(child.list_name)}> Delete </Button>
                                {/* <input type='button' value="delete" */}
                                <ul>                              
                                    {child.tracks_list && child.tracks_list.map((grandson) =>
                                       <li> Track ID: {grandson.track_id} &nbsp;&nbsp;&nbsp; 
                                            Track Title: {grandson.track_title} &nbsp;&nbsp;&nbsp;  
                                            Album Title: {grandson.album_title} &nbsp;&nbsp;&nbsp; 
                                            Artist Name: {grandson.artist_name}
                                            <Button size="small" variant="text" onClick={() => removeTrackfromList(child.list_name, grandson.track_id)}> remove </Button>
                                            <Divider textAlign="right"></Divider>

                                       </li> 
                                    )}
                                </ul> 
                                <ul> 
                                    {child.review && child.review.map((onereview) =>
                                       <li> User: {onereview.username} &nbsp;&nbsp;&nbsp; Comments: {onereview.review}
                                       </li> 
                                    )}
                                </ul>                                    
                                <div >
                                    <form  className="newForm">
                                    <label>add review:
                                    {/* <input id="addreview" type="text" name="addreview" onChange={err => setDetails({...details, addreview: err.target.value, listname:child.list_name})} value ={details.addreview}/> */}
                                    <input id="addreview" type="text" name="addreview" maxlength="100" className="item"/>
                                    </label>
                                    </form>
                                    <input type="submit" value='create' onClick={() => addReview(document.getElementsByClassName('item'), child.list_name)} />
                                </div>
                            </Collapsible>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}
export default ShowLists;