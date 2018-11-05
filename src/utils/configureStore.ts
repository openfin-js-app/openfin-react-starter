import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createOpenfinMiddleware } from '@albertli90/redux-openfin';

import rootReducer, {IRootState} from '../redux';
import rootSaga from '../redux/sagas';

declare const window:any;

export default (parentState?:IRootState)=>{

    const openfinMiddleware = createOpenfinMiddleware(window.fin,{});
    const sagaMiddleware = createSagaMiddleware();
    const devtools = window.devToolsExtension?window.devToolsExtension():(f:any):any => (f);

    const middleware = compose(
        applyMiddleware(
            sagaMiddleware,
            openfinMiddleware,
        ),
        devtools
    );

    const store = createStore(
        rootReducer(parentState),
        middleware,
    );

    sagaMiddleware.run(rootSaga);

    return store;

}