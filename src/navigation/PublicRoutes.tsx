import Layout from '@/components/Layout/Layout';
import { EmailVerifyPage } from '@/pages/EmailVerify';
import { LoginPage } from '@/pages/Login';
import { SignupPage } from '@/pages/Signup';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { EmailVerify, Login, SignUp } from './path';

function PublicRoutes() {
  return (
    <Switch>
      <Route exact path={Login} component={LoginPage} />
      <Route exact path={SignUp} component={SignupPage} />
      <Route exact path={EmailVerify} component={EmailVerifyPage} />
      <Redirect to={Login} />
    </Switch>
  );
}

export default PublicRoutes;
