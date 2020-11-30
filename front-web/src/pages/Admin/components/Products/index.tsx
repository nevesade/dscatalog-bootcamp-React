import React from 'react';
import List from './List';
import { Route, Switch } from 'react-router-dom';
import From from './Form';

const Products = () => {
    return (
        <div>

            <Switch>
                <Route path="/admin/products" exact>
                    <List />
                </Route>
                <Route path="/admin/products/:productId">
                    <From />
                </Route>
            </Switch>
        </div>


    );

}

export default Products;
