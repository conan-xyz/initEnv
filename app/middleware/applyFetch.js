/**
 * Created by Conan on 2016/12/1.
 */
import encode from 'querystring/encode';
const TOKEN_HEADER = 'X-Authorization-Token';
const TOKEN_KEY = 'token';

export const PAYLOAD = Symbol('PAYLOAD');

export const FETCH_ERROR = 'FETCH_ERROR';
export const BAD_REQUEST = 'BAD_REQUEST';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export const FORBIDDEN = 'FORBIDDEN';
export const REQUEST_TIMEOUT = 'REQUEST_TIMEOUT';
export const SERVER_ERROR = 'SERVER_ERROR';
export const GATEWAY_TIMEOUT = 'GATEWAY_TIMEOUT';

export const STATUS_REQUEST = Symbol('STATUS_REQUEST');
export const STATUS_SUCCESS = Symbol('STATUS_SUCCESS');


export function createTypes(name) {
    const types = new Map();
    types.set('request', `request@${name}`);
    types.set('success', `success@${name}`);
    types.set('failure', `failure@${name}`);
    return types;
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function cleanToken(token) {
    localStorage.removeItem(TOKEN_KEY);
}

export default store => next => action => {
    const payload = action[PAYLOAD];
    if (payload === undefined) {
        next(action);
        return;
    }
    let {endpoint, params, options, post} = payload;
    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }
    if (typeof endpoint !== 'string') {
        new Error('endpoint must be string')
    }

    options = options || {};
    if (typeof post !== 'function') {
        post = data => data;
    }

    const types = payload.types;
    if (!types instanceof Map) {
        new Error('types must be Map');
    }
    if (types.has('request') || typeof types.get('request') !== 'string') {
        new Error('type of request must be string')
    }
    if (types.has('success') || typeof types.get('success') !== 'string') {
        new Error('type of success must be string')
    }
    if (types.has('failure') || typeof types.get('failure') !== 'string') {
        new Error('type of success must be string')
    }

    let url = `${endpoint}`;
    if (params) {
        url = `${url}?${encode(params)}`
    }
    let headers = options.headers;
    if (!headers) {
        headers = new Headers({
            'Content-Type': 'application/json'
        })
    }

    const token = localStorage.getItem('token');
    if (token) {
        headers.set(TOKEN_HEADER, token)
    }

    options.headers = headers;
    options.credentials = 'include';

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[PAYLOAD];
        return finalAction;
    };
    next(actionWith({type: types.get('request')}));

    return fetch(url, options)
        .then(res => {
            if (res.ok) {
                res.json()
                    .then(data => next(actionWith({res: post(data), type: types.get('success')})))
            } else {
                switch (res.status) {
                    case 400:
                        next(actionWith({type: BAD_REQUEST, fetch_type: types.get('failure'), status: 400}));
                        break;
                    case 401:
                        next(actionWith({type: UNAUTHORIZED, fetch_type: types.get('failure'), status: 401}));
                        break;
                    case 403:
                        next(actionWith({type: FORBIDDEN, fetch_type: types.get('failure'), status: 403}));
                        break;
                    case 408:
                        next(actionWith({type: REQUEST_TIMEOUT, fetch_type: types.get('failure'), status: 408}));
                        break;
                    case 500:
                        next(actionWith({type: SERVER_ERROR, fetch_type: types.get('failure'), status: 500}));
                        break;
                    case 504:
                        next(actionWith({type: GATEWAY_TIMEOUT, fetch_type: types.get('failure'), status: 504}));
                        break;
                    default:
                        next(actionWith({type: FETCH_ERROR, fetch_type: types.get('failure'), status: res.status}));
                }
            }
        }).catch(err => console.log(err));
}