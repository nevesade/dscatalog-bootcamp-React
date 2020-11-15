
import React from 'react';
import { UserInfos } from '../../../core/types/UserInfos';


type Props = {

    userinfos: UserInfos;
}

const info = ({userinfos}: Props) => (

    <h1>
        {userinfos.name}

    </h1>


);

export default UserInfos;