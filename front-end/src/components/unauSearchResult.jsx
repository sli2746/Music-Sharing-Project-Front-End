/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-08 16:29:23
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-09 14:22:32
 * @FilePath: /front-end/src/components/unauSearchResult.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState,useEffect} from 'react';
import Collapsible from 'react-collapsible';
import {showlist, trackinfo } from "../api/list";
import Divider from "@mui/material/Divider";
function UnauthenUserPortal2({SortingResult, error}){
    const [details, setDetails] = useState({sortPlaylistResult:""});
    const [fetched, setfetched] = useState(null)
    useEffect(()=>{
        const getlists= () =>{
            showlist()
                .then((res)=>{
                    console.log("fetch for unauth", res.data.lists)
                    setfetched(res.data.lists)
                })
                .catch((error)=>console.log(error));
        };
        getlists();
    },[]);

    var sortedList = fetched;
    if (details.sortPlaylistResult === "sortcreator" ){
        sortedList = fetched.sort(
            (p1, p2) => (p2.creator < p1.creator) ? 1 : (p2.creator > p1.creator) ? -1 : 0);
    }else if(details.sortPlaylistResult === "sortnumberOfTracks"){
        sortedList = fetched.sort(
            (p1, p2) => (p2.num_tracks < p1.num_tracks) ? 1 : (p2.num_tracks > p1.num_tracks) ? -1 : 0);
    }else if(details.sortPlaylistResult === "sortshowingName"){
        sortedList = fetched.sort(
            (p1, p2) => (p2.list_name < p1.list_name) ? 1 : (p2.list_name > p1.list_name) ? -1 : 0);
    }else if(details.sortPlaylistResult === "sortlastModifiedDate"){
        sortedList = fetched.sort(
            (p1, p2) => (p1.last_modify_date < p2.last_modify_date) ? 1 : (p1.last_modify_date > p2.last_modify_date) ? -1 : 0);        
    }
    else if(details.sortPlaylistResult === "sorttotalPlayTime"){
        sortedList = fetched.sort(
            (a,b)=>(a.hour - b.hour || a.minutes - b.minutes || a.second - a.second));        
    }
    else if(details.sortPlaylistResult === "0"){
        sortedList = fetched;
    }else{
        sortedList = fetched;
    }

    let youtubeurl= 'https://www.youtube.com/results?search_query='

    return (
        <div className='mainBody'>
            <form>
                <div>  
                    View public play lists 
                    <Divider sx={{ my: 1 }} />
                    <br/>   
                    <label>Sort by:
                    <select id="sortPlaylistResult" name="sortPlaylistResult" onChange={err => setDetails({...details, sortPlaylistResult: err.target.value})} value ={details.sortPlaylistResult}>
                        <option value="0">select:</option>
                        <option value="sortlastModifiedDate">last modified date</option>
                        <option value="sortshowingName">showing name</option>
                        <option value="sortcreator">creator</option>
                        <option value="sorttotalPlayTime">total play-time</option>
                        <option value="sortnumberOfTracks">number of tracks</option>
                    </select>
                    </label>
                    {/* <input type="submit" /> */}
                </div>
            </form>
            <br/>  
            <Divider sx={{ my: 1 }} />

            <div className="searchResults">
                <ul>
                {sortedList && sortedList.map((child) =>
                    <li key={child.name}>
                        <div className='list'>
                        <Collapsible trigger = {"Playlist Name: "+[child.list_name] +"    "+"; Creator: "+[child.creator] +"; Description: " +[child.description] +"; Number of Tracks: "+[child.num_tracks] +"; Playtime: "+[child.hour]+"h"+[child.minuits]+"m"+[child.second]+"s" }>
                            <ul>                              
                                {child.track_list && child.track_list.map((grandson) =>
                                   <li> Track ID: {grandson.track_id} &nbsp;&nbsp;&nbsp; Track Title: {grandson.track_title}&nbsp;&nbsp;&nbsp;  Artist Name: {grandson.artist_name}
                                   <a href={youtubeurl+grandson.track_title} target="_blank" rel="noopener noreferrer"> Play on Youtube </a>
                    
                                   </li> 
                                )}
                            </ul> 
                        </Collapsible>
                        </div>
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
 }
export default UnauthenUserPortal2;


