import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

const thunk = (store) => (next) => (action) => {
    typeof action === 'function' ? action(store.dispatch) : next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
