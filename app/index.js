/**
 * Created by Conan on 2016/12/1.
 */
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./root/Root.prod');
} else {
    module.exports = require('./root/Root.dev');
}


if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers');
        store.replaceReducer(nextReducer);
    })
}