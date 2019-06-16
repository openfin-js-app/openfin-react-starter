import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReactOpenfinMiddleware } from 'react-openfin';

import rootReducer, {IRootState} from '../reduxs';
import rootSaga from '../reduxs/sagas';

declare const window:any;

export default (
        parentState?:IRootState
)=>{

    const sagaMiddleware = createSagaMiddleware();
    // !!!README!!!
    // use the built-in middleware to communicate with react-openfin for advanced features
    const reactOpenfinMiddleware = createReactOpenfinMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
            reactOpenfinMiddleware,
        ),
    );

    const store = createStore(
        rootReducer(parentState),
        enhancers,
    );

    sagaMiddleware.run(rootSaga);

    return store;

}