/**
 * Created by Conan on 2016/12/1.
 */
import React from 'react';
import {render} from 'react-dom';
import Provider from 'react-redux/lib/components/Provider';
import store from '../store/store';
import routes from '../routes';

const root = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>, root);