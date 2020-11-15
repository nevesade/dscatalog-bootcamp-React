

import React from 'react';
import { UserInfos } from '../../core/types/UserInfos';




type Props = {
    
    userinfos: UserInfos;
}

const infos = ({userinfos} : Props) => {



    return(

        <div>
        <h5>
                Nome : {userinfos?.login}
            </h5>
    
            <h5>
                Repositórios públicos:  {userinfos?.public_repos}
            </h5>
    
            <h5>
                Localide : {userinfos?.location}
            </h5>
    
            <h5>
                Membro desde:  {userinfos?.created_at}
            </h5>
    
    
        </div>

    );
    
    

        


    }



  export default infos;