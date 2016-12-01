/**
 * Created by Conan on 2016/12/1.
 */
import {STATUS_REQUEST, STATUS_SUCCESS} from '../middleware/applyFetch';
import uuid from 'node-uuid';

const initialState = {
    res: null,
    status: null,
    type: null,
    id: uuid.v4()
};


export function createReducer(...types) {
    const request = types.map(it => it.get('request'));
    const success = types.map(it => it.get('success'));

    return (state = initialState, action) => {
        switch (true) {
            case request.indexOf(action.type) >= 0:
                return Object.assign({}, state, {
                    status: STATUS_REQUEST,
                    type: action.type,
                    id: uuid.v4()
                });
            case success.indexOf(action.type) >= 0:
                return Object.assign({}, state, {
                    res: action.res,
                    status: STATUS_SUCCESS,
                    type: action.type,
                    id: uuid.v4()
                });
            default:
                return state;
        }
    }
}