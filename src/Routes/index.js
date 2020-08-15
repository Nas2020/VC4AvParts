import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import AdminPage  from "../Components/AdminPage";
import AdminLogin from '../Components/AdminLogin';
import CustomForm from '../Components/AdminPage/CustomForm';
import Profile from '../Components/Profile';
import CredentialDef from '../Components/credentialdef';
import Wallet from '../Components/Wallet';
import Schema from '../Components/Schema'
import IssueCert from '../Components/IssueCert';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';






const Root = () => {

    return (
        <Router >
            <div>
            
            <Switch>
                <Route from ='/' component ={AdminLogin} exact/>
                <Route from ='/login' component ={AdminLogin} exact/>
                <Route path='/admin' component={ AdminPage } />
                <Route path='/profile' component={ Profile } exact />
                <Route path ='/onboarding' component= { CustomForm } exact />
                <Route path = '/credentialdef' component = {CredentialDef} exact />
                <Route path = '/wallet' component = {Wallet} exact />
                <Route path = '/schema' component = {Schema} exact />
                <Route path = '/issuecert' component = {IssueCert} exact />
                <Route path = '/nav' component = {Nav} exact />
                <Route path = '/footer' component = {Footer} exact />
                <Route render = { 
                    ()=> <h3>Not Found</h3>

                } />
            </Switch>
           
            </div>
            
        </Router>
    );
}

export default Root;

