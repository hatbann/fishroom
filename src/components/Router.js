import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../routes/Home';
import Auth from '../routes/Auth';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
