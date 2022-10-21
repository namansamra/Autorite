import { useGlobalStore } from '@/store/store';
import React from 'react';
import PublicRoutes from './PublicRoutes';
import AuthRoutes from './AuthRoutes';
import Layout from '@/components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
function Navigation() {
  const userInfo = useGlobalStore((state) => state.appState.userInfo);
  console.log(userInfo);
  if (!userInfo) {
    return (
      <Switch>
        <Route>
          <PublicRoutes />
        </Route>
      </Switch>
    );
  }
  return (
    <Layout>
      <AuthRoutes />
    </Layout>
  );
}

export default Navigation;
