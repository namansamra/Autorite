import Layout from '@/components/Layout/Layout';
import { DashboardPage } from '@/pages/Dashboard';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  CreateSimple,
  Dashboard,
  Home,
  MyAccount,
  Setting,
  DetailedArticle,
} from './path';
import { CreateSimplePage } from '@/pages/Create/index';
import { DetailedArticlePage } from '@/pages/DetailedArticle';
import { MyAccountPage } from '@/pages/MyAccount';
function AuthRoutes() {
  return (
    <Switch>
      <Route exact path={Dashboard} component={DashboardPage} />
      <Route exact path={MyAccount} component={MyAccountPage} />
      <Route exact path={DetailedArticle} component={DetailedArticlePage} />
      <Route
        exact
        path={Setting}
        render={(props) => <div {...props}>Settings</div>}
      />
      <Route exact path={CreateSimple} component={CreateSimplePage} />
      <Redirect to={Dashboard} />
    </Switch>
  );
}

export default AuthRoutes;
