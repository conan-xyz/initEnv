/**
 * Created by Conan on 2016/12/1.
 */
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Base from './base';
import IndexForm from './containers/index';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Base}>
            <Route path="index" component={IndexForm}/>
        </Route>
    </Router>
);

export default routes;