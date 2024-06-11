/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-09 13:37:40
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-11 10:45:57
 * @FilePath: /front-end/src/pages/dmcaPage.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect} from 'react';
import { getPolicy } from "../api/user";
function DmcaPage(){
    const [content,setContent] = useState("");
    
    useEffect(()=>{
        getPolicy("dmca")
            .then((res)=>{
                setContent(res.data.content)
                
            })
            .catch((error)=>console.log(error));
    },[]);
    
   // https://www.thelonesgroup.com/customer/vault.asp?op=item&vid=3558
    return (
    //   <div>
    //     <h2>Digital Millennium Copyright Act ("DMCA")</h2>
    //     <div>
    //         <p>
    //             SongFinder respects the intellectual property rights of others.
    //             Per the DMCA, SongFinder will respond expeditiously to claims of copyright infringement on the Site if submitted to SongFinder's Copyright Agent as described below.
    //             Upon receipt of a notice alleging copyright infringement, SongFinder will take whatever action it deems appropriate within its sole discretion, 
    //             including removal of the allegedly infringing materials and termination of access for repeat infringers of copyright protected content.
    //         </p>
    //         <p>
    //             If you believe that your intellectual property rights have been violated by SongFinder 
    //             or by a third party who has uploaded materials to our website, 
    //             please provide the following information to the designated Copyright Agent listed below:
    //         </p>
    //         <p>
    //             1. A description of the copyrighted work or other intellectual property that you claim has been infringed;
    //         </p>
    //         <p>
    //             2. A description of where the material that you claim is infringing is located on the Site;
    //         </p>
    //         <p>
    //             3. An address, telephone number, and email address where we can contact you and, if different, 
    //             an email address where the alleged infringing party, if not SongFinder, can contact you;
    //         </p>
    //         <p>
    //             4. A statement that you have a good-faith belief that the use is not authorized by the copyright owner or 
    //             other intellectual property rights owner, by its agent, or by law;
    //         </p>
    //         <p>
    //             5. A statement by you under penalty of perjury that the information in your notice is accurate and 
    //             that you are the copyright or intellectual property owner or are authorized to act on the owner's behalf;
    //         </p>
    //         <p>
    //             6.Your electronic or physical signature. 
    //         </p>
    //         <p>
    //             SongFinder may request additional information before removing any allegedly infringing material. 
    //             In the event SongFinder removes the allegedly infringing materials, 
    //             SongFinder will immediately notify the person responsible for posting such materials that SongFinder removed or disabled access 
    //             to the materials. SongFinder may also provide the responsible person with your email address so that the person may respond to your allegations.
    //         </p>
    //         <p>
    //             Pursuant to 17 U.S.C. 512(c). SongFinder designated Copyright Agent is:
    //         </p>
    //         <p>
    //             Attn: SongFinder <br/>
    //             Phone: 123-123-1234 <br/>
    //             Email: abcdefg@gmail.com
    //         </p>
    //     </div>
    //   </div>
    <div><h2>Digital Millennium Copyright Act ("DMCA")</h2>{content}</div>
    )
 }


export default DmcaPage;