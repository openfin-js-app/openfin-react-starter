import * as React from 'react';
import { connect } from 'react-redux';

import {
    IRootState,
    clientSetValue,
} from '../reduxs';

import { IWithClient, ClientContextProvider } from '../reduxs/client/context';

const ClientCtxProvider:React.FunctionComponent<Partial<IWithClient>> = (
    {
        state,
        actions,
        children,
    }
)=>{
    return (<ClientContextProvider value={{
        state,
        actions
    }}>
        {children}
    </ClientContextProvider>)
}

export default connect(
    (state:IRootState) => ({
        state:state.client,
    }),
    (dispatch => ({
        actions:{
            updateClientCount:(count:number)=>{
                dispatch(clientSetValue({count}))
            }
        }
    }))
)(ClientCtxProvider);