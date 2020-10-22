import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginPage from './components/user-default/loginPage';
import RegisterPage from './components/user-default/registerPage';
import ProtectedRoute from './components/protectedRoute';
import { checkCookie, actions } from './reducers/redux/authSlices';
import ConnectedUsersRoutes from './components/ConnectedUsersRoutes';

function App() {
  const [canRender, setCanRender] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCookie()).then(resp => {
      dispatch(actions.setReqStatus('idle'));
      setCanRender(true);
    });
  }, [dispatch]);

  return (
    <>
      {!canRender ? null :
        <Switch>
          <Route
            exact path="/login"
            component={LoginPage}
          />
          <Route
            exact path="/register"
            component={RegisterPage}
          />
          <ProtectedRoute path="/" component={ConnectedUsersRoutes} />
        </Switch>
      }
    </>
  );
}

export default App;
