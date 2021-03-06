import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './core/assets/styles/components/Navbar';
import Admin from './pages/Admin';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/Catalog/components/ProductDetails';
import Home from './pages/Home';
import Auth from './pages/Admin/Auth';
import history from './core/utilis/history';
import PrivateRoute from './core/components/Routes/PrivateRoute';


const Routes = () => (

    <Router history={history}>
        <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalog />
            </Route>
            <Route path="/products/:productId">
                <ProductDetails />
            </Route>
            <Redirect from="/auth" to="/auth/login" exact />
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/products"  exact />
            <PrivateRoute path="/admin">
                <Admin />
            </PrivateRoute>
        </Switch>
    </Router>

);

export default Routes;