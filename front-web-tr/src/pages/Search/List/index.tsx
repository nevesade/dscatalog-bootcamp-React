import React from 'react';
import { Route, Switch } from 'react-router-dom';

import UserInfos from '../UserInfos';



const SearchInfos = () => {

    return (

        <div>

            <Switch>

               
                <Route path="/Search"    >
                    <UserInfos/>

                </Route>

            </Switch>
        </div>

    );

}

export default SearchInfos;


