import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser } from '../reducers/redux/authSlices';
import HomePage from './home/homePage';
import UserProfilePage from './user-default/UserProfilePage';
import Navbar from './appbar/Navbar';
import ClassesPage from './classesPage';
import AlertsPage from './AlertPage';
import ConfigPhase from './configPhase';
import FacAdminPage from './admins/facAdmin/FacAdminPage';
import ProtectedAdminRoutes from './admins/facAdmin/protectedAdminRoutes';

const ConnectedUsersRoutes = () => {
    const user = useSelector(getUser);
    return (
        <div
            style={{ marginTop: "65px" }}
        >
            <Navbar user={user} />
            <Switch>
                <Route
                    exact path="/" component={HomePage}
                />
                <ProtectedAdminRoutes
                    exact path="/facadmin" component={FacAdminPage}
                />
                <Route
                    exact path="/classes" component={ClassesPage}
                />
                <Route
                    exact path="/alerts" component={AlertsPage}
                />
                <Route
                    exact path="/configuration" component={ConfigPhase}
                />
                <Route
                    exact path={`/${user.username}`} component={UserProfilePage}
                />
                <Route path="*" component={() => "404 Not Found"} />

            </Switch>
        </div>
    );
};

export default ConnectedUsersRoutes;