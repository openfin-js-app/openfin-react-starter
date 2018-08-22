import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createOpenfinMiddleware } from '@albertli/redux-openfin';

import rootReducer from '../redux';
import rootSaga from '../redux/sagas';

declare const window:any;

export default ()=>{

    const openfinMiddleware = createOpenfinMiddleware(window.fin);
    const sagaMiddleware = createSagaMiddleware();
    const devtools = window['devToolsExtension']?window['devToolsExtension']():(f:any):any => (f);

    const middleware = compose(
        applyMiddleware(
            sagaMiddleware,
            openfinMiddleware,
        ),
        devtools
    );

    const store = createStore(
        rootReducer,
        middleware,
    );

    sagaMiddleware.run(rootSaga);

    return store;

}