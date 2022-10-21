import Layout from '@/components/Layout/Layout';
import { LoginPage } from '@/pages/Login';
import { SignupPage } from '@/pages/Signup';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login, SignUp } from './path';

function PublicRoutes() {
  return (
    <Switch>
      <Route exact path={Login} component={LoginPage} />
      <Route exact path={SignUp} component={SignupPage} />
      <Redirect to={Login} />
    </Switch>
  );
}

export default PublicRoutes;
