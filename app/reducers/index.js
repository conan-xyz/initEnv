/**
 * Created by Conan on 2016/12/1.
 */
import combineReducers from 'redux/lib/combineReducers';
import * as errorState from './error';
import * as utils from './reducer';
import * as action from '../actions/action';

const doActionState = utils.createReducer(action.DO_ACTION);


const rootReducer = combineReducers({
    errorState,
    doActionState
});

export default rootReducer;