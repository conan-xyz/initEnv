/**
 * Created by Conan on 2016/12/1.
 */
import {
    FETCH_ERROR,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    REQUEST_TIMEOUT,
    SERVER_ERROR,
    GATEWAY_TIMEOUT
} from '../middleware/applyFetch';

const initialState = {
    type: null,
    fetch_type: null,
    status: null
};


export default function error(state = initialState, action) {
    switch (action.type) {
        case BAD_REQUEST:
            return {type: BAD_REQUEST, fetch_type: action.fetch_type, status: 400};
        case UNAUTHORIZED:
            return {type: UNAUTHORIZED, fetch_type: action.fetch_type, status: 401};
        case FORBIDDEN:
            return {type: FORBIDDEN, fetch_type: action.fetch_type, status: 403};
        case REQUEST_TIMEOUT:
            return {type: REQUEST_TIMEOUT, fetch_type: action.fetch_type, status: 408};
        case SERVER_ERROR:
            return {type: SERVER_ERROR, fetch_type: action.fetch_type, status: 500};
        case GATEWAY_TIMEOUT:
            return {type: GATEWAY_TIMEOUT, fetch_type: action.fetch_type, status: 504};
        case FETCH_ERROR:
            return {type: FETCH_ERROR, fetch_type: action.fetch_type, status: action.status};
        default:
            return initialState
    }
}