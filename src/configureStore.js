
import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from './middleware/promiseMiddleware';
import rootReducer from './reducers'

export default function configureStore (client, initialState = {}) {
    const middleware = promiseMiddleware(client);
    const store = createStore(rootReducer, initialState, applyMiddleware(middleware));
    store.client = client;
    return store;
}




// import { createStore as _createStore, applyMiddleware, compose } from 'redux';
// import createMiddleware from './middleware/clientMiddleware';
// import {routerMiddleware} from 'react-router-redux'
// import thunk from 'redux-thunk'
// import history from './history'
// import rootReducer from './reducers/index'
// import Immutable from 'immutable';
//
// export default function configureStore(client,data) {
//     let finalCreateStore;
//     const reduxRouterMiddleware = routerMiddleware(history);
//     const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];
//     finalCreateStore = applyMiddleware(...middleware)(_createStore);
//     if (data) {
//         data.pagination = Immutable.fromJS(data.pagination);
//     }
//     const store = finalCreateStore(rootReducer, data);
//
//     if (module.hot) {
//         // Enable Webpack hot module replacement for reducers
//         module.hot.accept('./reducers', () => {
//             const nextRootReducer = require('./reducers/index')
//             store.replaceReducer(nextRootReducer)
//         })
//     }
//     return store
// }
