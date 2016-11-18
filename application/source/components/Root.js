/**
 * Created by Grant on 11/18/16.
 */
import React from 'react';
import { Provider } from 'react-redux';
// import {Router, Route, browserHistory} from 'react-router';
// import TodoAppComponent from './TodoAppComponent';

const Root = ({ store }) => (
    <Provider store = { store }>
        <Router history = {browserHistory}>
            <Route path = '/(:filter)' component = {TodoAppComponent}/>
        </Router>
    </Provider>
);

export default Root;