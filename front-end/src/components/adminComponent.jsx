import React, { useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Unstable_Grid2';
import DialogTitle from '@mui/material/DialogTitle';
import {getAllUser, setAdmin, cancelAdmin, enableUser, disableUser, getAllReview, hideReview,getpolicy, updatepolicy } from "../api/admin";


// change numbers and booleans to string
function visibilitycheck(boo){
    if (boo ===true){return "public"}
    else { return "private"}
} 
function privilegecheck(num){
    if (num === 4){return "Admin"}
    else if (num === 2){return "Register"}
    else { return "guest"}
}
function userStatuscheck(stus){
    if (stus === 4){return "Already Signed up"}
    else if (stus === 8){return "Not Allowed"}
    else if (stus === 2){return "Unverified"}
    else { return "not sign up"}
} 

// change user role
// 2 -> register
// 4 -> admin
function GrantPrivilege(childRole, childEmail) {
    console.log(childRole);
    console.log(childEmail);
    if (childRole === 4){
        childRole = 2;
        console.log(childRole);
        alert("privilege changed, please refresh the page.");
        cancelAdmin(childEmail, [{email: childEmail},{role: childRole}])
        .then((res) => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error)
        }
        );
    } else if(childRole === 2){
        childRole = 4;
        console.log(childRole);
        alert("privilege changed, please refresh the page.");
        setAdmin(childEmail, [{email: childEmail},{role: childRole}])
        .then((res) => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error)
        }
        );
    } else{
        console.log(childRole);
    }
}

// change user status
//4 -> already signed up
//8 -> not allowed
function ChgStatus(childStatus,childEmail) {
    console.log(childStatus);
    if (childStatus === 4){
        childStatus = 8;
        console.log(childStatus);
        alert("Status changed, please refresh the page.");
        disableUser(childEmail, [{email: childEmail},{status: childStatus}])
        .then((res) => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error)
        }
        );
    }
    else if(childStatus === 8){
        childStatus= 4;
        console.log(childStatus);
        alert("Status changed, please refresh the page.");
        enableUser(childEmail, [{email: childEmail},{status: childStatus}])
        .then((res) => {
            console.log(res.data);
            })
        .catch((error) => {
            console.log(error)
        }
        );
    } else{
        alert("unverified users, couldn't change status");
        console.log(childStatus);
    }
}

function ChangeVisibility(childListName, childReview, childVisibility){
    // console.log(childVisibility);
    console.log("list name:",childListName);
    console.log(childReview);
    alert("Visibility changed, please refresh the page.")
    hideReview({listName:childListName, review:childReview })
    .then((res) => {
        console.log(res.data);
        })
    .catch((error) => {
        console.log(error)
    }
    );
}

function AdminComponent(){
     //use-effect port
    const [fetched, setfetched] = useState(null);
    useEffect(()=>{
        getAllUser()
            .then((res)=>{
                setfetched(res.data.user)
            })
            .catch((error)=>console.log(error));
    },[]);
    console.log("fetched admin all user", fetched)

    //another use-effect port to get DMCA policy
    const [DMCAoldpolicy, setDMCAoldpolicy] = useState(null);
    const [newDMCApolicy, setNewDMCApolicy] = useState(null);
    const [DMCAopen, setDMCAopen] = useState(false);
    
    useEffect(()=>{
        getpolicy("dmca")
            .then((res)=>{
                console.log("dmca get", res.data)
                setDMCAoldpolicy([{content:res.data.content}])
            })
            .catch((error)=>console.log(error));
    },[]);
    console.log("got DMCA policy", DMCAoldpolicy)

    const handleClickDMCAopen = (name,description,visibility) => {
        setDMCAopen(true);
        console.log("get open")
        console.log("DMCA OLD policy", DMCAoldpolicy)    
    };
    const handleDMCAClose = () => {
        console.log("get close")
        setDMCAopen(false);
    };
    
    const updateDMCA = () => {
        console.log("update dmca this:", newDMCApolicy)
        let newcontent = {content:newDMCApolicy.content, type:"dmca"}
        newDMCApolicy.content ? newcontent.content = newDMCApolicy.content : newcontent.content = DMCAoldpolicy.content;
        console.log(newcontent)

        updatepolicy(newcontent)
        .then((res) => {
            console.log(res.data);
            console.log("DMCA CHNAGED to", newcontent, newDMCApolicy);
        })
        .catch((error) => {
            console.log(error)
        });
        setDMCAopen(false);
         this.setState({ state: this.state }) 
    }
    
    //PP
    const [PPoldpolicy, setPPoldpolicy] = useState(null);
    const [newPPpolicy, setNewPPpolicy] = useState(null);
    const [PPopen, setPPopen] = useState(false);
    
    useEffect(()=>{
        getpolicy("policy")
            .then((res)=>{
                console.log(res.data)
                setPPoldpolicy([res.data])
            })
            .catch((error)=>console.log(error));
    },[]);
    console.log("got PP policy", PPoldpolicy)

    const handleClickPPopen = () => {
        console.log("pp is open")
        setPPopen(true);
    };
    const handlePPClose = () => {
        setPPopen(false);
    };
    
    const updatePP = () => {
        let newcontent = {content:newPPpolicy.content, type:"policy"}
        newPPpolicy.content ? newcontent.content = newPPpolicy.content : newcontent.content = PPoldpolicy.content;
        console.log("new pp json", newcontent)

        updatepolicy(newcontent)
        .then((res) => {
            console.log(res.data);
            console.log("pp CHNAGED to", newcontent, newPPpolicy);
        })
        .catch((error) => {
            console.log(error)
        });
        console.log("pp status", newPPpolicy)
        setPPopen(false);
        this.setState({ state: this.state }) 
    }

    const [AUPoldpolicy, setAUPoldpolicy] = useState(null);
    const [newAUPpolicy, setNewAUPpolicy] = useState(null);
    const [AUPopen, setAUPopen] = useState(false);

    useEffect(()=>{
        getpolicy("aup")
            .then((res)=>{
                console.log(res.data)
                setAUPoldpolicy([res.data])
            })
            .catch((error)=>console.log(error));
    },[]);
    console.log("got AUP policy", AUPoldpolicy)

    const handleClickAUPopen = () => {
        console.log("AUP is open")
        setAUPopen(true);
    };
    const handleAUPClose = () => {
        setAUPopen(false);
    };
    
    const updateAUP = () => {
        let newcontent = {content:newAUPpolicy.content, type:"aup"}
        newAUPpolicy.content ? newcontent.content = newAUPpolicy.content : newcontent.content = AUPoldpolicy.content;
        console.log("new AUP json", newcontent)

        updatepolicy(newcontent)
        .then((res) => {
            console.log(res.data);
            console.log("AUP CHNAGED to", newcontent, newAUPpolicy);
        })
        .catch((error) => {
            console.log(error)
        });
        console.log("AUP status", )
        setAUPopen(false);
        this.setState({ state: this.state }) 
    }
    
    const [reviewlist, setreviewlist] = useState(null);
    useEffect(()=>{
        getAllReview()
            .then((res)=>{
                setreviewlist(res.data.reviews)
            })
            .catch((error)=>console.log(error));
    },[]);
    console.log("get review list", reviewlist)

    return (
        <div className='mainBody'>
           <h1>Admin Page</h1>
           
           {/* manage user status and role */}
           <div id="adminComUserListDiv">
            <h3>User Management</h3>
                <ul>
                    {fetched && fetched.map((child) =>/*  等待维护中，不确定return的东西是什么 */
                    <li key={child.id} id="adminCompUserList">
                        <div className='list'>
                           <span>{"Name: "+[child.firstName]+" "+[child.lastName]}</span> &nbsp;&nbsp;&nbsp;
                           <span>{" Role: "+[privilegecheck(child.role)] + " "}</span>
                           <input type='button' onClick={() => GrantPrivilege(child.role, child.email)} value="change privilege"/> <br/>
                           <span>{"User status : "+[userStatuscheck(child.status)] + " "}</span>
                           <input type='button' onClick={() => ChgStatus(child.status, child.email)} value="Change user status"/>
                        </div>
                    </li>
                )}
                </ul>
           </div>

            {/* manage review visibility */}
           <div id="adminComReviewListDiv">
                <h3>Review Management</h3>
                <ul>
                    {/* user review list */}
                    {reviewlist && reviewlist.map((child) =>
                    <li key={child.list_name} id="adminCompReviewList">
                        Listname: {[child.list_name]}
                        <div className='list'>
                            {child.review_list && child.review_list.map((grandchild) =>
                                <li key={grandchild.id}>
                                    <div className='list'>
                                        <span>{"Username: "+[grandchild.username]}</span> &nbsp;&nbsp;&nbsp;
                                        <span>{"Review: "+[grandchild.review]}</span> &nbsp;&nbsp;&nbsp;
                                        <span>{"Visibility : "+ [visibilitycheck( grandchild.visibility)]}</span>
                                        <input type='button' onClick={() => ChangeVisibility(child.list_name, grandchild.review, grandchild.visibility)} value="Change visibility"/>
                                    </div>
                                </li>
                            )}
                        </div>
                    </li>
                )}
                </ul>
           </div>

           <div classname="policies">
                <Grid className='DMCA' xs={6} md={4}>
                    <Card variant="outlined">
                        <Typography variant="h5" component="div"> Digital Millennium Copyright Act ("DMCA") </Typography>
                            {DMCAoldpolicy && DMCAoldpolicy.map((child) =>
                                <Typography variant="body2"> {child.content} </Typography>
                            )} 
                        <CardActions>
                            <Button size="small" onClick={()=> handleClickDMCAopen()}> Edit</Button>
                            <Dialog open={DMCAopen} onClose={handleDMCAClose}>
                                <DialogTitle>Edit DMCA Policy</DialogTitle>
                                    <DialogContent>
                                         <TextField autoFocus margin="dense" size= "large" TextareaAutosize label="DMCA Policy" type="text" variant="outlined"
                                                onChange={(err) => setNewDMCApolicy({...newDMCApolicy, content: err.target.value })}/> 
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ margin:"auto" }} onClick={()=>updateDMCA()}>Save</Button>
                                    </DialogActions>
                            </Dialog>
                            
                        </CardActions>
                    </Card>
                </Grid>

                
                <Grid className='PP' xs={6} md={4} >
                    <Card variant="outlined">
                        <Typography variant="h5" component="div"> Privacy Policy </Typography>
                            {PPoldpolicy && PPoldpolicy.map((child) =>
                                <Typography variant="body2"> {child.content} </Typography>
                            )} 
                        <CardActions>
                            <Button size="small" onClick={()=> handleClickPPopen()}> Edit</Button>
                            <Dialog open={PPopen} onClose={handlePPClose}>
                                <DialogTitle>Edit Privacy Policy</DialogTitle>
                                    <DialogContent>
                                        <TextField autoFocus margin="dense" size= "large" TextareaAutosize label="PP Policy" type="text" variant="outlined"
                                                onChange={(err) => setNewPPpolicy({...newPPpolicy, content: err.target.value })}/>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ margin:"auto" }} onClick={()=>updatePP()}>Save</Button>
                                    </DialogActions>
                            </Dialog>
                        </CardActions>
                    </Card>
                </Grid>
                
                <Grid className='AUP' xs={6} md={4} >
                    <Card variant="outlined">
                        <Typography variant="h5" component="div"> Acceptable Use Policy(AUP) </Typography>
                            {AUPoldpolicy && AUPoldpolicy.map((child) =>
                                <Typography variant="body2"> {child.content} </Typography>
                            )} 
                        <CardActions>
                            <Button size="small" onClick={()=> handleClickAUPopen()}> Edit</Button>
                            <Dialog open={AUPopen} onClose={handleAUPClose}>
                                <DialogTitle>Edit Privacy Policy</DialogTitle>
                                    <DialogContent>
                                        <TextField autoFocus margin="dense" size= "large" TextareaAutosize label="AUP Policy" type="text" variant="outlined"
                                                onChange={(err) => setNewAUPpolicy({...newAUPpolicy, content: err.target.value })}/>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button sx={{ margin:"auto" }} onClick={()=>updateAUP()}>Save</Button>
                                    </DialogActions>
                            </Dialog>
                        </CardActions>
                    </Card>
                </Grid>

           </div>
        </div>
    )

 }
export default AdminComponent;


