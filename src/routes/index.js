import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import SignUpProject from '../pages/SignUpProject';
import DashboardUsers from '../pages/DashboardProject';
import SignUpUser from '../pages/SignUpUser';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route
        path="/usersInProject/:id/:name_project"
        component={DashboardUsers}
        isPrivate
      />
      <Route path="/detailProject/:id" component={SignUpProject} isPrivate />
      <Route path="/registerProject" component={SignUpProject} isPrivate />
      <Route path="/registerUser" component={SignUpUser} isPrivate />
    </Switch>
  );
}
