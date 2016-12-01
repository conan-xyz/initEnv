/**
 * Created by Conan on 2016/12/1.
 */

import {PAYLOAD, createTypes} from '../middleware/applyFetch';

export const DO_ACTION = createTypes('do_action');

export function doAction() {
    return dispatch => dispatch({
        [PAYLOAD]: {
            types: DO_ACTION,
            endpoint: '/api/do_action',
            options: {method: 'GET'}
        }
    })
}