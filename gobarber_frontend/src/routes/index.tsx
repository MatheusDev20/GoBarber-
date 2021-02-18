import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';
import Profile from '../pages/Profile/index';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => (
  <>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
    </Switch>
  </>
);
export default Routes;
