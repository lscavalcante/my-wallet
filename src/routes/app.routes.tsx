import React from 'react';

import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Layout from '../components/Layout';

import { Switch, Route } from 'react-router-dom';

const AppRoutes: React.FC = () => (
    <Layout>
        <Switch>
            <Route path="/"  exact component={Dashboard} />
            <Route path="/list/:type" exact component={List} />
        </Switch>
    </Layout>
)

export default AppRoutes;