/**
 * Created by Conan on 2016/12/1.
 */
import compose from '../../node_modules/redux/lib/compose';
import createStore from '../../node_modules/redux/lib/createStore';
import applyMiddleware from '../../node_modules/redux/lib/applyMiddleware';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import fetchMiddleware from './../middleware/applyFetch';
import rootReducer from './../reducers/index';
import DevTools from './../containers/DevTools';

const store = compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(fetchMiddleware),
    applyMiddleware(createLogger()),
    DevTools.instrument()
)(createStore)(rootReducer);

export default store;