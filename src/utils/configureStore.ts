import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createOpenfinMiddleware } from '@albertli90/redux-openfin';
import { ChannelType } from '@albertli90/redux-openfin/init';

import rootReducer, {IRootState} from '../reduxs';
import rootSaga from '../reduxs/sagas';

declare const window:any;

export default (
        channelType:ChannelType,
        channelClientId:string,
        sharedActions:string[],
        parentState?:IRootState
)=>{

    const openfinMiddleware = createOpenfinMiddleware(window.fin,{
        channelType,channelClientId,sharedActions,
        channelRandomSuffix:process.env.NODE_ENV === 'development',
        autoDocking:process.env.REACT_APP_ENABLE_AUTO_DOCKING === 'true',
        dockingOptions:{
            range: 120,
        }
    });
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