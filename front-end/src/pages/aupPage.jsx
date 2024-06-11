/*
 * @Author: Li yli2935@uwo.ca
 * @Date: 2022-12-09 13:37:40
 * @LastEditors: Li yli2935@uwo.ca
 * @LastEditTime: 2022-12-11 10:40:22
 * @FilePath: /front-end/src/pages/aupPage.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect} from 'react';
import { getPolicy } from "../api/user";
function AupPage(){
    const [content,setContent] = useState("");
    
    useEffect(()=>{
        getPolicy("aup")
            .then((res)=>{
                setContent(res.data.content)
                
            })
            .catch((error)=>console.log(error));
    },[]);

    return(
        // https://www.websitepolicies.com/blog/sample-acceptable-use-policy-template
        // <div>
        //     
        //     <p>
        //         Please read this acceptable use policy ("policy", “AUP”) carefully before 
        //         using SongFinder website (“website”, "service") operated by us.
        //     </p>
        //     <p>
        //         Services provided by us may only be used for lawful purposes. You agree to comply with all applicable laws, rules, and 
        //         regulations in connection with your use of the services. Any material or conduct that in our judgment violates this policy in any manner may 
        //         result in suspension or termination of the services or removal of user’s account with or without notice.
        //     </p>
        //     <h4>Prohibited use</h4>
        //     <p>
        //     You may not use the services to publish content or engage in activity that is illegal under applicable law, 
        //     that is harmful to others, or that would subject us to liability, including, without limitation, 
        //     in connection with any of the following, each of which is prohibited under this AUP:
        //     </p>
        //     <div>
        //         <ul>
        //             <li> Phishing or engaging in identity theft</li>
        //             <li> Distributing computer viruses, worms, Trojan horses, or other malicious codet</li>
        //             <li> Distributing pornography or adult related content or offering any escort services</li>
        //             <li> Promoting or facilitating violence or terrorist activities</li>
        //             <li> Infringing the intellectual property or other proprietary rights of others</li>
        //         </ul>
        //     </div>
        //     <h4>Enforcement</h4>
        //     <p>Your services may be suspended or terminated with or without notice upon any violation of this policy. 
        //         Any violations may result in the immediate suspension or termination of your account.
        //     </p>
        //     <h4>Reporting violations</h4>
        //     <p>To report a violation of this policy, please contact us.</p>
        //     <p>We reserve the right to change this policy at any given time, of which you will be promptly updated. 
        //         If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.
        //     </p>
        // </div>
        <div><h2>Acceptable Use Policy(AUP)</h2>{content}</div>
    )
}


export default AupPage;