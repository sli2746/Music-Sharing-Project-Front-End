import React, {useState, useEffect} from 'react';
import Collapsible from 'react-collapsible';
import { showlist, createlist } from "../api/list";

// need to change this samples to results retrieved from backend
let samples =[{title:"track title 1", name:"artist name 1", band: "band 1", genres: "genres 1", playlength: "playlength 1", year: "year 1"},
                {title:"track title 2", name:"artist name 2", band: "band 2", genres: "genres 2", playlength: "playlength 2", year: "year 2"}]


function UnauthenUserPortal({Searching, error}){
    const [details, setDetails] = useState({inputArtist:"", inputBand:"",inputGenre:"", inputTrackTitle:""});
    const [fetched, setfetched] = useState({inputArtist:"", inputBand:"",inputGenre:"", inputTrackTitle:""})
    
    useEffect(()=>{
        const getlists= () =>{
            showlist()
                .then((res)=>{
                    console.log(res.data)
                    setfetched(res.data.list)
                })
                .catch((error)=>console.log(error));
        };
        getlists();
    },[]);

    const submitHandler = err =>{
        err.preventDefault();
        Searching(details);
    }
//    search = child.title.replace(" ", "+");
    let youtubeurl= 'https://www.youtube.com/results?search_query='
    const results = samples.map((child) =>
        <li key={child.title}>
            <div className='list'>
                <Collapsible trigger = {"title : "+[child.title]+ ", name : "+[child.name]}>
                    <p>band:{child.band}, genres:{child.genres}, playlength:{child.playlength}, year:{child.year}</p>
                    <a href={youtubeurl+child.title} target="_blank" rel="noopener noreferrer"> Play on Youtube </a>
                </Collapsible>
            </div>
        </li>
    )

    return (
        <div className='mainBody'>
            <form onSubmit={submitHandler}>
                <div>
                    Search tracks by  
                    <input type="text" placeholder = "artist" name="inputArtist" onChange={err => setDetails({...details, inputArtist: err.target.value})} value ={details.inputArtist} ></input>
                    <input type="text" placeholder = "band" name="inputBand" onChange={err => setDetails({...details, inputBand: err.target.value})} value ={details.inputBand} ></input>
                    <input type="text" placeholder = "genre" name="inputGenre" onChange={err => setDetails({...details, inputGenre: err.target.value})} value ={details.inputGenre} ></input>
                    <input type="text" placeholder = "track title" name="inputTrackTitle" onChange={err => setDetails({...details, inputTrackTitle: err.target.value})} value ={details.inputTrackTitle} ></input>
                    <input type="submit" />
                </div>
            </form>
            <div className="searchResults">
                <ul>{results}</ul>
            </div>
        </div>
    )
 }
export default UnauthenUserPortal;


